import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const firebaseRead = async (collectionName: string) => {
  const docRef = query(collection(db, collectionName));
  const docSnap = await getDocs(docRef);

  return docSnap.docs.map((d) => d.data());
};

export const firebaseAdd = async (collectionName: string, object: unknown) => {
  const docRef = await addDoc(collection(db, collectionName), object);

  return docRef.id;
};
