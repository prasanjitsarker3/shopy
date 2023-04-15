import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Cart = ({ cart,handleClearCart,children}) => {
    let total = 0;
    let shippingTotal = 0;
    let quantity = 0;
    for (const carts of cart) {
        // carts.quantity=carts.quantity || 1;
        total = total + carts.price * carts.quantity;
        shippingTotal += carts.shipping;
        quantity = quantity + carts.quantity;
    }
    const tax = total * 7 / 100;
    const grandTotal = tax + total + shippingTotal;
    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: {total}</p>
            <p>Total Shipping:{shippingTotal}</p>
            <p>Tax:{total.toFixed(2)}</p>
            <h6>Grand Total:{grandTotal.toFixed(2)}</h6>
            <button onClick={handleClearCart} className='btn-clear'><span>Clear Cart</span>
                <FontAwesomeIcon className='' icon={faTrashAlt} />
            </button>
            {children}
        </div>
    );
};

export default Cart;