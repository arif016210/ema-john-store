import React from 'react';

const ReviewItems = (props) => {

    const { name, img, seller, price, key, quantity } = props.product;

    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-info">
                <h4 className="product-name">{name}</h4>
                <br />
                <p><small> by: {seller} </small></p>
                <h3> ${price} </h3>
                <p>Quantity:{quantity}</p>
                <br />
                <button className="mainBtn"
                    onClick={() => props.removeProduct(key)}
                >Remove</button>

            </div>
        </div>
    );
};

export default ReviewItems;