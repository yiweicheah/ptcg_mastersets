import {
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const loginWithProviders = async ({ provider = "" }) => {
  const googleProvider = new GoogleAuthProvider();

  //function to decide with provider to use
  const selectedProvider = () => {
    switch (provider) {
      case "google":
        return googleProvider;
      default:
        return null;
    }
  };

  const res = await setPersistence(auth, browserLocalPersistence).then(() =>
    signInWithPopup(auth, selectedProvider())
  );

  return res;
};

const logout = async () => {
  signOut(auth);
};

export { loginWithProviders, logout };
