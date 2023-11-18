import { Product } from "@/components";
import { useStateContext } from "@/context/StateContext";
import { client, urlFor } from "@/lib/client";
import React, { useState } from "react";
import {
    AiFillStar,
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlineStar,
} from "react-icons/ai";

const ProductDetails = ({ productsData, productData }) => {
    const { image, name, details, price } = productData;

    const [index, setIndex] = useState(0)
    const {decQty, incQty, qty, onAdd} = useStateContext()
    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={urlFor(image && image[index])} className="product-detail-image"/>
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => (
                            <img src={urlFor(item)}
                            key={i}
                            className={i === index ? 'small-image selected-image' : 'small-image'}
                            onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>
                </div>
                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details</h4>
                    <p>{details}</p>
                    <p className="price">{price}$</p>
                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decQty}>
                                <AiOutlineMinus />
                            </span>
                            <span className="num" onClick="">
                                {qty}
                            </span>
                            <span className="plus" onClick={incQty}>
                                <AiOutlinePlus />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={() => onAdd(productData,qty )}>Add to Cart</button>
                        <button type="button" className="buy-now" onClick="">Buy now</button>
                    </div>
                </div>
            </div>
            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {productsData.map((product) => (
                            <Product key={product._id} product={product}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getStaticPaths = async () => {
    //get only slugs from products
    const queryProducts = `*[_type == "product"]{
        slug{
            current
        }
    }`;
    const products = await client.fetch(queryProducts);

    const paths = products.map((product) => ({
        params: { slug: product.slug.current },
    }));

    return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params: { slug } }) => {
    //grab all the products from sanity dashboard
    const queryProduct = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productData = await client.fetch(queryProduct);

    const queryProducts = '*[_type == "product"]';
    const productsData = await client.fetch(queryProducts);

    return {
        props: { productsData, productData },
    };
};
export default ProductDetails;
