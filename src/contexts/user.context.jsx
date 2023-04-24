import { useState, useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { onAuthStateChangedListner, createUserDocumentFromAuth } from "../utils/firebase/firebase.util";

export const userContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}


const userReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: payload
            }

        default:
            throw new Error(`unhandled type ${type} in userReducer`)
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => {

    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)
    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
    }
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListner((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user)
        })
        return unsubscribe
    }, []);



    return <userContext.Provider value={value}>{children}</userContext.Provider>
}