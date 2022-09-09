import Button from '../button/button.component';
import { useState, useContext } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.util';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import { userContext } from '../../contexts/user.context';

const defaultFormFeilds = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFeilds, setFormFeilds] = useState(defaultFormFeilds);
    const { displayName, email, password, confirmPassword } = formFeilds;
    const { setCurrentUser } = useContext(userContext);

    console.log('sign up hit')
    console.log(formFeilds);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password != confirmPassword) {
            alert("passwords do not match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            await createUserDocumentFromAuth(user, { displayName });

            resetForm();


        } catch (error) {
            console.log(error);
            if (error.code == 'auth/email-already-in-use') {
                alert("cannot create user, email already in use!!");
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
            <h2>Don't have an account?</h2>
            <span>sign up with your e mail and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName} />

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

                <FormInput
                    label="conform Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword} />

                <Button buttonType='google' type="submit">signup</Button>

            </form>
        </div>
    )
}

export default SignUpForm;