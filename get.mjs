import db from './models/index.mjs';

const getModels = async () => {
  try {
    // retrieve the first cart
    const carts = await db.Cart.findAll();
    // console.log('1st cart');
    // console.log(carts[0]);
    const cart = carts[0];

    const items = await cart.getItems();
    // console.log('items in first cart');
    // console.log(items);

    const cartItems = await cart.getCart_items();
    // console.log('cart items');
    // console.log(cartItems);

    // Retrieve the quantity of each item in the 1st cart
    for (let i = 0; i < cartItems.length; i += 1) {
      console.log('quantity: ', cartItems[i].quantity);
    }
  } catch (err) {
    console.log(err);
  }
};

getModels();
