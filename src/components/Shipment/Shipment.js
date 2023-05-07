import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Shipment = () => {
    const [name, setName] = useState('');
    const [user]=useAuthState(auth);
const [email, setEmail] = useState('');
const [address, setAddress] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [error, setError] = useState('');


//event handler
const handleNameBlur = event => {
    setEmail(event.target.value)
}
const handleEmailBlur = event => {
    setEmail(event.target.value)
}

const handleAddressBlur = event => {
    setAddress(event.target.value)
}
const handleNumberBlur = event => {
    setPhoneNumber(event.target.value)
}

const handleShipping = event => {
    event.preventDefault();
}
    return (
        <div className='container form-div my-5 p-5'>
            <form onSubmit={handleShipping} className='form'>
                <h1 className='text-center'>Shipping Address</h1>
                <div className="mb-3">
                    <label for="exampleInputName1" className="form-label">Your Name</label>
                    <input type="text" onBlur={handleNameBlur} className="form-control input" id="exampleInputName1" aria-describedby="nameHelp" />

                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input  value={user?.email} readOnly className="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="address" className="form-label ">Address</label>
                    <input type="text" onBlur={handleAddressBlur} className="form-control input" id="exampleInputAddress" />
                </div>
                <div className="mb-3">
                    <label for="number" className="form-label ">Phone Number</label>
                    <input type="tel" onBlur={handleNumberBlur} className="form-control input" id="exampleInputPhoneNumber" />
                </div>
                <p style={{ color: 'red' }}>{error}</p>
                <hr />
                <button type="submit" className="btn  mt-4 login-btn  input">Add Shipping</button>
            </form>
        </div>
    );
};

export default Shipment;