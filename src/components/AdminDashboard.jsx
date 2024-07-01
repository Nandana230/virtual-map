import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useOutletContext } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { getAuth, signOut } from 'firebase/auth'; // Assuming you have firebase auth imported

const AdminDashboard = () => {
  const { selectedOption } = useOutletContext();
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastWeekCount, setLastWeekCount] = useState(0);
  const [lastMonthCount, setLastMonthCount] = useState(0);
  const [thisWeekCount, setThisWeekCount] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');
  const [feedbackAnalyticsData, setFeedbackAnalyticsData] = useState({
    weekly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Feedback Count (Current Month)',
        data: [0, 0, 0, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }],
    },
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Feedback Count (Yearly)',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      }],
    },
  });

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'feedback'));
        const feedbackItems = querySnapshot.docs.map(doc => doc.data());

        const filteredFeedbackItems = feedbackItems.filter(item => item.timestamp && item.timestamp.seconds);

        setFeedbackData(filteredFeedbackItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedback data: ", error);
        setLoading(false);
      }
    };

    if (selectedOption === 'feedbacks' || selectedOption === 'feedback-analytics') {
      fetchFeedbackData();
    }
  }, [selectedOption]);

  const calculateCounts = (data) => {
    const now = new Date();
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const startOfCurrentWeek = new Date(now);
    startOfCurrentWeek.setDate(now.getDate() - now.getDay());

    let weekCount = 0;
    let monthCount = 0;
    let currentWeekCount = 0;
    let lastMonthCount = 0;

    data.forEach(item => {
      const date = new Date(item.timestamp.seconds * 1000);
      if (date >= startOfLastMonth && date <= endOfLastMonth) {
        monthCount++;
      }
      if (date >= startOfLastMonth && date <= now) {
        weekCount++;
        if (date >= startOfCurrentWeek) {
          currentWeekCount++;
        }
      }
    });

    setLastMonthCount(monthCount);
    setLastWeekCount(weekCount - currentWeekCount); // Last week excluding current week
    setThisWeekCount(currentWeekCount); // Current week count
  };

  const processFeedbackData = (data) => {
    const weeklyData = [0, 0, 0, 0];
    const monthlyData = new Array(12).fill(0);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    data.forEach(item => {
      const date = new Date(item.timestamp.seconds * 1000);
      const week = Math.ceil(date.getDate() / 7) - 1; // Get week index (0-3 for 4 weeks)
      const month = date.getMonth(); // Get month index (0-11 for 12 months)

      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        weeklyData[week]++;
      }

      if (date.getFullYear() === currentYear) {
        monthlyData[month]++;
      }
    });

    setFeedbackAnalyticsData({
      weekly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Feedback Count (Current Month)',
          data: weeklyData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
      },
      monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Feedback Count (Yearly)',
          data: monthlyData,
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        }],
      },
    });
  };

  useEffect(() => {
    if (selectedOption === 'feedback-analytics') {
      processFeedbackData(feedbackData);
      calculateCounts(feedbackData);
    }
  }, [feedbackData, selectedOption]);

  const handleSort = () => {
    const sortedData = [...feedbackData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.timestamp.seconds - b.timestamp.seconds;
      } else {
        return b.timestamp.seconds - a.timestamp.seconds;
      }
    });
    setFeedbackData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // Redirect or handle logout success
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          stepSize: 5,
          font: {
            size: 10,
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
    <div className="w-full p-4 bg-white">
      <div className="flex justify-end mb-4">
        <button
          className="bg-pink-600 text-white px-4 py-2 rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {selectedOption === 'feedbacks' && (
            <div>
              <div className="flex justify-end mb-4">
                <button
                  className="bg-pink-700 text-white px-4 py-2 rounded-md mr-2"
                  onClick={handleSort}
                >
                  Sort by Date: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </button>
              </div>
              {feedbackData.length === 0 ? (
                <p>No feedback data available.</p>
              ) : (
                feedbackData.map((feedback, index) => (
                  <div key={index} className="bg-gradient-to-r from-red-200 to-pink-200 shadow-md rounded p-4 mb-4">
                    {feedback && feedback.message ? (
                      <div>
                        <p className="font-bold">Name: <span className="font-normal">{feedback.name}</span></p>
                        <p className="font-bold">Email: <span className="font-normal">{feedback.email}</span></p>
                        <p className="font-bold">Message: <span className="font-normal">{feedback.message}</span></p>
                        <p className="font-bold">Timestamp: <span className="font-normal">{new Date(feedback.timestamp.seconds * 1000).toLocaleString()}</span></p>
                      </div>
                    ) : (
                      <p>Data missing or undefined</p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {selectedOption === 'feedback-analytics' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Feedback Analytics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-gradient-to-r from-red-200 to-pink-200 shadow-md rounded p-4">
                  <h3 className="text-xl font-bold">Feedbacks This Week</h3>
                  <p className="text-4xl">{thisWeekCount}</p>
                </div>
                <div className="bg-gradient-to-r from-red-200 to-pink-200 shadow-md rounded p-4">
                  <h3 className="text-xl font-bold">Feedbacks Last Week</h3>
                  <p className="text-4xl">{lastWeekCount}</p>
                </div>
                <div className="bg-gradient-to-r from-red-200 to-pink-200 shadow-md rounded p-4">
                  <h3 className="text-xl font-bold">Feedbacks Last Month</h3>
                  <p className="text-4xl">{lastMonthCount}</p>
                </div>
              </div>
              <div className="	
bg-white shadow-md rounded p-4 mb-4 h-64">
                <Bar data={feedbackAnalyticsData.weekly} options={chartOptions} />
              </div>
              <div className="bg-white shadow-md rounded p-4 h-64">
                <Bar data={feedbackAnalyticsData.monthly} options={chartOptions} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;

