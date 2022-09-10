import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged

}
    from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAt8_mc8KjRmp8B1jDJCPD9P6yAnGK_HXs",
    authDomain: "clothing-store-b1734.firebaseapp.com",
    projectId: "clothing-store-b1734",
    storageBucket: "clothing-store-b1734.appspot.com",
    messagingSenderId: "645439901920",
    appId: "1:645439901920:web:a71d845fc3c1d5eebb0085"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters(
    {
        prompt: "select_account"
    }
);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth, addtionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());


    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...addtionalInformation
            });
        } catch (error) {

            console.log("error creating the user ", error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListner = (callback) => {

    onAuthStateChanged(auth, callback)
} 