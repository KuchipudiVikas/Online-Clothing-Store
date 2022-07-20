import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import {
    auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect
} from "../../utils/firebase/firebase.util";


const SignIn = () => {
    useEffect(() => {
        (async () => {
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        })();
    }, []);


    const loggoogleuser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocref = await createUserDocumentFromAuth(user);
    }
    return (
        <div>
            <h1>oh hello man sign in here</h1>
            <button onClick={loggoogleuser}>
                sign in with google
            </button>
            <button onClick={signInWithGoogleRedirect}>
                sign in with google redirect
            </button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;