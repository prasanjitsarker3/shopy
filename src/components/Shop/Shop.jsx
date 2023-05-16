import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart, deleteShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(0)
    //Pagination
    const { totalProducts } = useLoaderData();
    // const itemsPage = 10;
    const totalPage = Math.ceil(totalProducts / itemsPerPage);
    const pageNumbers = [...Array(totalPage).keys()]
    const options = [9, 12, 18];

    function handleSelectChange(event) {
        setItemsPerPage(parseInt(event.target.value))
        setCurrentPage(0);
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
            const data = await response.json();
            setProducts(data)
        }
        fetchData()
    }, [currentPage, itemsPerPage])
    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);
    useEffect(() => {
        const storeCart = getShoppingCart();
        const ids = Object.keys(storeCart);
        fetch(`http://localhost:5000/productById`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(productData => {
                const savedCart = [];
                //Step -1: Get id of the addedProduct
                for (const id in storeCart) {
                    //Step -2: Get Product from product state by using id
                    const addedProduct = productData.find(product => product._id === id)
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
            })


    }, [])
    const handleAddToCart = (product) => {
        let newCart = [];
        // cart.push(product); 
        // const newCart = [...cart, product];
        //if product doesn't exist in the cart , then set quantity =1
        //if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id)
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists]
        }
        setCart(newCart);
        addToDb(product._id)
    }
    const handleClearCart = () => {
        setCart([])
        deleteShoppingCart();
    }
    return (
        <>
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
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
            <div className='pagination'>
                <p>Current Page: {currentPage}</p>
                {
                    pageNumbers.map(number => <button key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >{number} </button>)

                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;