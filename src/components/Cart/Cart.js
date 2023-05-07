import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'

const Cart = (props) => {
    const { cart } = props;
    console.log(cart)
    const navigate = useNavigate();
    let total = 0;
    let shipping = 0;
    let quantity = 0;

    for (const product of cart) {
        quantity = quantity + product.quantity
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping;
    }
    let tax = parseFloat((total * 0.1).toFixed(2))
    let grandTotal = total + shipping + tax;
    return (
        <div className='cart'>
            <h4>
                order summary
            </h4>
            <p>Selected items: {quantity} </p>
            <p>Total price:$ {total} </p>
            <p>Total shipping:$ {shipping} </p>
            <p>Tax: ${tax} </p>
            <h5>Grand Total: ${grandTotal}</h5>
            < >{props.children}</>

        </div>
    );
};

export default Cart;