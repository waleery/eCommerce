import { toast } from "react-hot-toast";
import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    };
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    };

    const onAdd = (product, quantity) => {
        console.log(product, quantity);
        const checkProductInCart = cartItems.find(
            (cartItem) => cartItem._id === product._id
        );

        setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + product.price * quantity
        );
        setTotalQuantities(
            (prevTotalQuantities) => prevTotalQuantities + quantity
        );

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartItem) => {
                if (cartItem._id === product._id)
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + quantity,
                    };
            });

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    };

    const onRemove = (id) => {
        let updatedCartItems = [...cartItems];

        let itemIndex = updatedCartItems.findIndex((item) => item._id === id);
        let itemQty = updatedCartItems[itemIndex].quantity;
        let itemValue = updatedCartItems[itemIndex].price * itemQty;

        updatedCartItems = updatedCartItems.filter((item) => item._id !== id);

        setCartItems(updatedCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - itemValue);
        setTotalQuantities(
            (prevTotalQuantities) => prevTotalQuantities - itemQty
        );
    };

    const toggleCartItemQuantity = (id, value) => {
        let updatedCartItems = [...cartItems];
        let newTotalPrice = totalPrice;
        let newTotalQuantities = totalQuantities;

        updatedCartItems = updatedCartItems.map((item) => {
            if (item._id === id) {
                if (value === "inc") {
                    newTotalPrice += item.price;
                    newTotalQuantities += 1;
                    return { ...item, quantity: item.quantity + 1 };
                } else if (value === "dec") {
                    if (item.quantity > 1) {
                        newTotalPrice -= item.price;
                        newTotalQuantities -= 1;
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                }
            }
            return item;
        });
        setCartItems(updatedCartItems);
        setTotalPrice(newTotalPrice);
        setTotalQuantities(newTotalQuantities);
    };

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
                setShowCart,
                toggleCartItemQuantity,
                onRemove,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);
