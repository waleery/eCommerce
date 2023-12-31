import React from "react";

import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "@/lib/client";

const Home = ({ productsData, bannerData }) => {
    return (
        <>
            <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
            {console.log(bannerData)}
            <div className="products-heading">
                <h2>Best Seller Products</h2>
                <p>Speakers of many variations</p>
            </div>

            <div className="products-container">
                {productsData?.map((product) => <Product key={product._id} product={product} />)}
            </div>
            <FooterBanner fotterBanner={bannerData && bannerData[1]} />
        </>
    );
};

export const getServerSideProps = async () => {
    //grab all the products from sanity dashboard
    const queryProducts = '*[_type == "product"]';

    const allProducts = await client.fetch(queryProducts);

    const shuffledProducts = [...allProducts].sort(() => Math.random() - 0.5)
    const productsData = shuffledProducts.slice(0,5)

    //grab all the banner data from sanity dashboard
    const queryBanner = '*[_type == "banner"]';

    const bannerData = await client.fetch(queryBanner);

    return {
        props: { productsData, bannerData },
    };
};

export default Home;
