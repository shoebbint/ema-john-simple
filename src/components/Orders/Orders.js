import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../Hooks/useCart';

import useProducts from '../../Hooks/useProducts';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Orders = () => {
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useCart()
    console.log(cart)
    const handleRemoveProduct = product => {
        const rest = cart.filter(pd => pd._id !== product._id)
        setCart(rest);
        removeFromDb(product._id);
    }
    const navigate = useNavigate();
    // console.log(cart?.length);
    return (
        <div className='shop-container'>
            <div className='review-items-container'>
                {
                    cart.length ?
                    cart.map(product => <ReviewItem key={product._id}
                        product={product}
                        handleRemoveProduct={handleRemoveProduct}
                    >

                    </ReviewItem>)
                    : <p>No items in cart</p>
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
<button onClick={()=>navigate('/shipment')}>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;