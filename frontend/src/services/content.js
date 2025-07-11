import axios from "axios";

import {
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  getDocs,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase";

/***********Pokemon TCG API***********/
const tcgApiGetCards = async ({ params = {} }) => {
  const baseUrl = "https://api.pokemontcg.io/v2/cards";

  const options = {
    params,
    headers: { "X-Api-Key": process.env.REACT_APP_TCGIO_API },
  };

  const res = await axios.get(baseUrl, options);

  return res.data;
};

/***********Firebase Content***********/
//Firebase Get
const fbGet = async ({ collectionName, documentName }) => {
  const docRef = doc(db, collectionName, documentName);
  const docSnap = await getDoc(docRef);
  const res = docSnap.data();

  return res;
};

//Firebase get by query
const fbQueryGet = async ({
  collectionName,
  documentName,
  subCollectionName,
  express,
  operator,
  condition,
}) => {
  let data = [];
  if (documentName !== null && subCollectionName !== null) {
    const q = query(
      collection(db, collectionName, documentName, subCollectionName),
      where(express, operator, condition)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const dataToPush = { ...doc.data(), id: doc.id };
      data.push(dataToPush);
    });
  } else {
    const q = query(
      collection(db, collectionName),
      where(express, operator, condition)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const dataToPush = { ...doc.data(), id: doc.id };
      data.push(dataToPush);
    });
  }

  return data;
};

//Firebase get collection
const fbCollectionGet = async ({
  collectionName,
  documentName = null,
  subCollectionName = null,
}) => {
  let data = [];
  if (documentName !== null && subCollectionName !== null) {
    const querySnapshot = await getDocs(
      collection(db, collectionName, documentName, subCollectionName)
    );

    querySnapshot.forEach((doc) => {
      const dataToPush = { ...doc.data(), id: doc.id };
      data.push(dataToPush);
    });
  } else {
    const querySnapshot = await getDocs(collection(db, collectionName));

    querySnapshot.forEach((doc) => {
      const dataToPush = { ...doc.data(), id: doc.id };
      data.push(dataToPush);
    });
  }

  return data;
};

//Firebase create new data
const fbCreate = async ({ collectionName, data }) => {
  const docRef = collection(db, collectionName);
  await addDoc(docRef, data);

  return data;
};

//Firebase update data
const fbUpdate = async ({ collectionName, documentName, data }) => {
  const docRef = doc(db, collectionName, documentName);
  await setDoc(docRef, data, { merge: true });

  return data;
};

export {
  tcgApiGetCards,
  fbGet,
  fbQueryGet,
  fbCollectionGet,
  fbCreate,
  fbUpdate,
};
