// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import "firebase/storage";
// import myContext from "../context/data/myContext";

const firebaseConfig = {
  apiKey: "AIzaSyAULCxS40uIvlTvTHtSM516_sc47aQcEiQ",
  authDomain: "e-commerce-2ff0c.firebaseapp.com",
  projectId: "e-commerce-2ff0c",
  storageBucket: "e-commerce-2ff0c.appspot.com",
  messagingSenderId: "26770020462",
  appId: "1:26770020462:web:74848b5489d6ac0e47ae7f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
export const storage = getStorage(app);

export { fireDB, auth };
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}
export async function upload(file, currentUser) {
  // const context = useContext(myContext);
  // const { photoURL } = context;
  const fileRef = ref(storage, currentUser.uid + ".png");

  await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });
}
