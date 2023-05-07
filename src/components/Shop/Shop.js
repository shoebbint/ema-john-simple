import React, { useEffect, useState } from 'react';
import useProducts from '../../Hooks/useProducts';
import { addToDb, getStoredCard } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { useNavigate } from 'react-router-dom';
import useCart from '../../Hooks/useCart';

const Shop = () => {

    const [cart, setcart] = useCart();
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    //products
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(`https://ema-john-server-woad.vercel.app/product?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [page,size])

    useEffect(() => {
        fetch("https://ema-john-server-woad.vercel.app/productCount")
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pages = Math.ceil(count / 10);
                setPageCount(pages);
            })
    }, [])

    // useEffect(() => {
    //     console.log('local storage first line', products)
    //     const storedCart = getStoredCard();
    //     const savedCart = [];
    //     for (const id in storedCart) {
    //         const addedProduct = products.find(product => product._id == id);
    //         if (addedProduct) {
    //             const quantity = storedCart[id];
    //             addedProduct.quantity = quantity;
    //             savedCart.push(addedProduct)
    //         }

    //     }
    //     setcart(savedCart)
    // }, [])
    const handleAddToCart = (selectedProduct) => {
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id)
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id)
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists]
        }

        setcart(newCart);
        addToDb(selectedProduct._id)

    }
    const navigate = useNavigate();
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    >
                    </Product>)
                }
                <div className='pagination'>
                    {
                        [...Array(pageCount).keys()].map(key =>
                            <div className='mx-2 '>
                                <button className={page === key ? 'selected' : ''} onClick={() => setPage(key)}>{key}</button>

                            </div>
                        )
                    }
                    <div>
                        <select defaultValue={'10'} onChange={e=> setSize(e.target.value)} >
                            <option value="5">5</option>
                            <option value="10"  >10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>

                    <button onClick={() => navigate('/orders')}>   Review order</button>
                </Cart>
            </div>
        </div >
    );
};

export default Shop;