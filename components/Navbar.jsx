import Link from "next/link";
import React from "react";

import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
    return (
        <div className="navbar-container">
            <p className="logo">
                <Link href="/">Store</Link>
            </p>

            <button type="button" className="cart-icon" onCanPlay=''>
              <AiOutlineShopping />
              <span className="cart-item-qty">
                1
              </span>
            </button>
        </div>
    );
};

export default Navbar;
