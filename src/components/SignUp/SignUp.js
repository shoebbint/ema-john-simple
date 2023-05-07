import React from 'react';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
// import css from "./SignUp.css";
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
const SignUp = () => {
    //states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate=useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
      ] = useCreateUserWithEmailAndPassword(auth);
    //event handler
    const handleEmailBlur = event => {
        setEmail(event.target.value)
    }
    const handlePasswordBlur = event => {
        setPassword(event.target.value)
    }
    const handleConfirmPasswordBlur = event => {
        setConfirmPassword(event.target.value)
    }
    if(user){
        navigate('/shop');
    }
    const handleCreateUser = event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('your two password did not matched')
            return;
        }

        if(password.length< 6){
            setError('password must be six character or longer')
            return;
        }
        createUserWithEmailAndPassword(email, password);


    }

    return (
        <div className='container form-div my-5 p-5'>
            <form onSubmit={handleCreateUser} className='form'>
                <h1 className='text-center'>Sign Up</h1>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onBlur={handleEmailBlur} className="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label ">Password</label>
                    <input type="password" onBlur={handlePasswordBlur} className="form-control input" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="confirmPassword" className="form-label ">Confirm Password</label>
                    <input type="password" onBlur={handleConfirmPasswordBlur} className="form-control input" id="exampleInputConfirmPassword1" />
                </div>
                <p style={{ color: 'red' }}>{error}</p>
                <button type="submit" className="btn  mt-4 login-btn  input">Sign Up</button>
                <p className='text-center'>Already have an account? <Link to="/login">Login</Link></p>

                <hr />
                <button type="submit" className="btn  mt-4 googleSignin  input ">


                    <i className="fa-brands fa-google"></i>  Continue with Google</button>
            </form>
        </div>
    );
};

export default SignUp;