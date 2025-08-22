import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
    }
  }, []);

  // Update cart totals whenever cartItems changes
  useEffect(() => {
    // Calculate total items
    const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    setTotalItems(itemsCount);
    
    // Calculate total price
    const price = cartItems.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    );
    setTotalPrice(price);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart
  const addToCart = (product, size, color, qty = 1) => {
    const existItem = cartItems.find(
      (x) => x._id === product._id && x.size === size && x.color === color
    );

    if (existItem) {
      // Update quantity if item already exists
      setCartItems(
        cartItems.map((x) =>
          x._id === existItem._id && x.size === size && x.color === color
            ? { ...x, qty: x.qty + qty }
            : x
        )
      );
    } else {
      // Add new item
      setCartItems([
        ...cartItems,
        {
          _id: product._id,
          name: product.name,
          image: product.images[0],
          price: product.price,
          size,
          color,
          qty,
        },
      ]);
    }
  };

  // Remove from cart
  const removeFromCart = (id, size, color) => {
    setCartItems(
      cartItems.filter(
        (x) => !(x._id === id && x.size === size && x.color === color)
      )
    );
  };

  // Update cart quantity
  const updateCartQuantity = (id, size, color, qty) => {
    setCartItems(
      cartItems.map((x) =>
        x._id === id && x.size === size && x.color === color
          ? { ...x, qty: qty }
          : x
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};