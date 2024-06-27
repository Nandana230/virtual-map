// src/feedbackService.js
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const addFeedback = async (feedback) => {
  try {
    const docRef = await addDoc(collection(db, 'feedback'), feedback);
    console.log('Feedback written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding feedback: ', e);
  }
};

export { addFeedback };
