import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import css from "./Login.css";
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
   //Require auth
   const navigate = useNavigate();
   let location = useLocation(); 
   let from = location.state?.from?.pathname || "/";
    //event handler
    const handleEmailBlur = event => {
        setEmail(event.target.value)
    }
    const handlePasswordBlur = event => {
        setPassword(event.target.value)
    }
    if (user) {
        // navigate('/shop');
        navigate(from, { replace: true });
    }
    const handleUserSignIn = event => {
        event.preventDefault();
        signInWithEmailAndPassword(email, password)


    }
    return (
        <div className='container form-div my-5 p-5'>
            <form onSubmit={handleUserSignIn} className='form'>
                <h1 className='text-center'>Log in</h1>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input onBlur={handleEmailBlur} type="email" className="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label ">Password</label>
                    <input onBlur={handlePasswordBlur} type="password" className="form-control input" id="exampleInputPassword1" />
                </div>

                {loading && <div class="text-center">
                    <div class="spinner-border text-info1" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>}
                <p style={{ color: "red" }}>{error?.message}</p>
                <button type="submit" className="btn  mt-4 login-btn  input">Login</button>
                <p className='text-center'>New to Ema-john? <Link to="/signup">Create New Account</Link></p>

                <hr />
                <button type="submit" className="btn  mt-4 googleSignin  input ">


                    <i className="fa-brands fa-google"></i>  Continue with Google</button>
            </form>
        </div>
    );
};

export default Login;