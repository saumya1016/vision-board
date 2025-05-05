
import { db } from './src/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const saveBoard = async (userId, items) => {
  await setDoc(doc(db, 'visionBoards', userId), {
    items,
    lastUpdated: new Date()
  });
};

export const loadBoard = async (userId) => {
  const docSnap = await getDoc(doc(db, 'visionBoards', userId));
  return docSnap.exists() ? docSnap.data().items : [];
};