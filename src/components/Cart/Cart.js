import React from 'react';


const Cart = (props) => {

    const cart = props.cart;

    // const total = cart.reduce((total, prd) => total + prd.price * prd.quantity, 0);
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity || 1;
    }

    let shipping = 0;

    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }

    let tax = total / 10;




    return (
        <div>
            <h3>Order Summary</h3>
            <h4> Items Ordered {cart.length} </h4>
            <p>Product Price: {Number(total).toFixed(2)}</p>
            <p><small>Shipping cost: {Number(shipping).toFixed(2)} </small></p>
            <p><small>Vat & Tax:  {Number(tax).toFixed(2)} </small></p>
            <p>Total Price: {Number(total + shipping + tax).toFixed(2)} </p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;