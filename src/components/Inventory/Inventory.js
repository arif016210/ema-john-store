import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const handleAddProduct = () => {
        fetch("https://apricot-pudding-98549.herokuapp.com/addproducts", {
            method: 'POST',
            headers: {
                'Content-Type': ' application/json'
            },
            body: JSON.stringify(fakeData)

        })
    }

    return (
        <div>
            <h1>This is Inventory coming soon...</h1>
            <button onClick={handleAddProduct} >Add Product</button>
        </div>
    );
};

export default Inventory;