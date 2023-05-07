import { type } from "@testing-library/user-event/dist/type";
import React, { useEffect, useState } from 'react';

import { getStoredCard } from "../utilities/fakedb";

const useCart = () => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const storedCart = getStoredCard();
        const savedCart = [];
        const keys=Object.keys(storedCart);
        console.log(keys)
        fetch("http://localhost:5000/productByKeys",{
            method:"POST",
            headers:{
              'content-type':'application/json'
            },
            body: JSON.stringify(keys)
        })
        .then(res=>res.json())
        .then(products=>{
            console.log(products)
       for (const id in storedCart) {
            const addedProduct = products.find(product => product._id === id);
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);

            }
        }
        setCart(savedCart);
        })
 


    }, [])
    return [cart, setCart];
}

export default useCart;