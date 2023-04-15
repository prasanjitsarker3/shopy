import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart,deleteShoppingCart} from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    useEffect(() => {
        const storeCart = getShoppingCart();
        const savedCart=[];
        //Step -1: Get id of the addedProduct
        for (const id in storeCart) {
            //Step -2: Get Product from product state by using id
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {
                //Step -3 : Added Quantity
                const quantity = storeCart[id];
                addedProduct.quantity = quantity;
                //Step-4: Add the added product to the saved Cart
                savedCart.push(addedProduct);
            }
        }
        //Ste the Cart
        setCart(savedCart);
    }, [products])
    const handleAddToCart = (product) => {
        let newCart=[];
        // cart.push(product); 
       // const newCart = [...cart, product];
        //if product doesn't exist in the cart , then set quantity =1
        //if exist update quantity by 1
        const exists =cart.find(pd => pd.id ===product.id)
        if(! exists){
            product.quantity=1;
            newCart=[...cart, product]
        }
        else{
            exists.quantity=exists.quantity+1;
            const remaining=cart.filter(pd => pd.id !==product.id);
            newCart=[...remaining, exists]
        }
        setCart(newCart);
        addToDb(product.id)
    }
    const handleClearCart=()=>{
        setCart([])
        deleteShoppingCart();
    }
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart handleClearCart={handleClearCart} cart={cart}>
                    <div>From Shop</div>
                    <Link className='proceed-link' to="/order">
                        <button className='btn-proceed'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;