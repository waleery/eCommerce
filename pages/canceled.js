import Link from "next/link";
import React from "react";
import { MdErrorOutline } from "react-icons/md";

const Canceled = () => {
    return (
        <div className="cancel-wrapper">
            <div className="cancel">
                <p className="icon-cancel">
                    <MdErrorOutline />
                </p>
                <h2>Payment Unsuccessful!</h2>
                <p className="description">
                    Please check the accuracy of your card details and try
                    again. 
        <br/>
        <br/>
                    If you have any questions plese send mail to:
                    
                    <a className="email" href="mailto:order@example.com">
                        order@example.com
                    </a>
                </p>
                <Link href="/">
                    <button type="button" width="300px" className="btn">
                        Back
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Canceled;
