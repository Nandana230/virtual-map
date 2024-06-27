import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const AdminDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'your-collection'));
        const items = querySnapshot.docs.map(doc => doc.data());
        console.log("Fetched items:", items);
        setData(items);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        data.map((item, index) => (
          <div key={index}>
            {item && item.seconds ? <p>{item.seconds}</p> : <p>Data missing or undefined</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
