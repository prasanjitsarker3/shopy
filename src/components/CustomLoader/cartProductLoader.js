import { getShoppingCart } from "../../utilities/fakedb";

const cartProductLoader = async () => {
    const loadedProduct = await fetch('products.json');
    const products = await loadedProduct.json();

    const storedCart = getShoppingCart();
    const savedCart = [];
    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd.id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }
    return savedCart;
}


export default cartProductLoader;