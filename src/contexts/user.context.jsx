import { useState,useEffect } from "react";
import { createContext } from "react";
import { onAuthStateChangedListner } from "../utils/firebase/firebase.util";

export const userContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
        console.log('user')
    })
    return unsubscribe
},[]);

    return <userContext.Provider value={value}>{children}</userContext.Provider>
}