import './Login.css';

import { useContext, useState } from 'react';
import { UserContext } from '../../App'
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';
import Header from '../Header/Header';



function App() {

    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        success: false

    })

    initializeLoginFramework()
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    // Login Section Start



    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res)
                setLoggedInUser(res)
                history.replace(from);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                setUser(res)
                setLoggedInUser(res)
            })
    }


    const handleBlur = (event) => {
        let isFormValid = true;

        // Email Validation 

        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value)

        }

        // Password Validation 

        if (event.target.name === 'password') {
            const isPaaswordValid = event.target.value.length > 6;
            const paswordNumberValid = /\d{1}/.test(event.target.value)
            isFormValid = (isPaaswordValid && paswordNumberValid);
        }
        if (isFormValid) {
            const newUserInfo = { ...user }
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo)
        }

    }


    const handleSubmit = (event) => {

        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    setUser(res)
                    setLoggedInUser(res)
                    history.replace(from);
                })

        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    setUser(res)
                    setLoggedInUser(res)
                    history.replace(from);
                })
        }

        event.preventDefault();
    }





    return (
        <div className="login">

            <br />
            {
                user.isSignIn ? <button onClick={signOut} className="btn btn-warning">Sign out</button>
                    : <button onClick={googleSignIn} className="btn btn-primary">Google Sign in</button>
            }

            {
                user.isSignIn && <div>
                    <h2>Name: {user.name} </h2>
                    <p>Email: {user.email} </p>
                    <img src={user.photo} alt="photo" />
                </div>
            }

            {/* Sign Up Section */}

            <div className="signup">
                <form onSubmit={handleSubmit}>
                    <h1>SignUp Form</h1>



                    {newUser && < input type="text" name="name" onBlur={handleBlur} className="form-control" placeholder="Enter Your Name..." />}

                    <input type="text" name="email" onBlur={handleBlur} className="form-control" placeholder="Enter Your Email..." required />
                    <input type="password" name="password" onBlur={handleBlur} className="form-control" placeholder="Enter Your Password..." required />
                    <input type="submit" className="btn btn-primary" value={newUser ? 'Sign up' : 'Sign in'} />

                </form>

                <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
                <label htmlFor="newUser">New Registration</label>

                <p style={{ color: 'red' }} > {user.error} </p>
                {
                    user.success && <p style={{ color: 'green' }}> User {newUser ? 'Created' : 'Logged In'}  Successfully! </p>
                }

            </div>

        </div>
    );
}

export default App;
