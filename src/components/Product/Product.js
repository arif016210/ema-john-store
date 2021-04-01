import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);

    const { name, img, seller, price, stock, key } = props.product;
    // console.log(props.product.key);

    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-info">
                <h4 className="product-name"> <Link to={'/product/' + key}> {name} </Link> </h4>
                <br />
                <p><small> by: {seller} </small></p>
                <h3> ${price} </h3>
                <p><small> only {stock} left in - order soon </small></p>
                {
                    props.showAddToCart &&
                    <button className="mainBtn" onClick={() => props.handleAddProduct(props.product)}>
                        <FontAwesomeIcon icon={faShoppingCart} /> cart to add
                    </button>
                }
            </div>
        </div>
    );
};

export default Product;