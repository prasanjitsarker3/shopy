import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = ({ product,handleRemovedFromCart}) => {
    console.log(product);
    const { _id, img, price, name, quantity } = product;
    return (
        <div className='review-item'>
            <img src={img} alt="" srcset="" />
            <div className='review-details'>
                <p className='product-title'>{name}</p>
                <p>Price: <span className='orange'>${price}</span></p>
                <p>Order Quantity: <span className='orange'>${quantity}</span></p>
            </div>
            <button onClick={()=>handleRemovedFromCart(_id)} className='btn-delete'> <FontAwesomeIcon className='delete-icon' icon={faTrashAlt} />
            </button>
        </div>
    );
};

export default ReviewItem;