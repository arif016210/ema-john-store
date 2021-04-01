import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {

    const [cart, setCart] = useState([])
    const [orderPlace, setOrderPlace] = useState(false)
    const history = useHistory()

    const handleProceedCheckout = () => {
        history.push('/shipment')
    }


    const removeProduct = (productKey) => {
        const newCart = cart.filter(product => product.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://apricot-pudding-98549.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))

    }, [])

    let thankyou;
    if (orderPlace) {
        thankyou = <img src={happyImage} alt="" />
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                <h1>Review {cart.length} </h1>
                {
                    cart.map(pd => <ReviewItems
                        removeProduct={removeProduct}
                        key={pd.key}
                        product={pd}>
                    </ReviewItems>)
                }
                {thankyou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="mainBtn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;