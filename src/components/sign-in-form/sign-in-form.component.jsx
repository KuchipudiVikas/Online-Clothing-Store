import Button from '../button/button.component';
import { useState, useEffect } from 'react';

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword

} from '../../utils/firebase/firebase.util';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';

const defaultFormFeilds = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFeilds, setFormFeilds] = useState(defaultFormFeilds);
    const { email, password, } = formFeilds;

    // useEffect(() => {
    //     (async () => {
    //         const response = await getRedirectResult(auth);
    //         if (response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     })();
    // }, []);
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);

    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
            resetForm();


        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect email for email');
                    break;
                case 'auth/user-not-found':
                    alert("no user associated with this email");
                    break
                default:
                    console.log(error);


            }
        }

    }

    const resetForm = () => {
        setFormFeilds(defaultFormFeilds);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFeilds({ ...formFeilds, [name]: value })
    };


    return (
        <div className='sign-up-container' >
            <h2>Already have an account?</h2>
            <span>sign up with your e mail and password</span>
            <form onSubmit={handleSubmit}>


                <FormInput
                    label="email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email} />

                <FormInput
                    label="password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password} />
                <div className='buttons-container'>

                    <Button type="submit">sign in</Button>

                    <Button type='button' buttonType='google' onClick={signInWithGoogle}> google sign in</Button>
                </div>
            </form>
        </div>
    )

}


export default SignInForm;