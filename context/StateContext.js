import { toast } from "react-hot-toast";
import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    };
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    };

    useEffect(() => {
        console.log(totalPrice)
    }, [totalPrice]);

    const onAdd = (product, quantity) => {
        console.log(product, quantity)
        const checkProductInCart = cartItems.find((cartItem) => cartItem._id === product._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice + (product.price * quantity))
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

        if(checkProductInCart){
            const updatedCartItems = cartItems.map((cartItem) => {
                if(cartItem._id === product._id) return {
                    ...cartItem,
                    quantity: cartItem.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else{
            product.quantity = quantity

            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} added to the cart.`)

    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                showCart,
                setShowCart
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context)