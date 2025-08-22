const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { adminProtect } = require('../middleware/authMiddleware');

// @desc    Get all users from file storage
// @route   GET /api/files/users
// @access  Private/Admin
router.get('/users', adminProtect, (req, res) => {
  try {
    const usersDir = path.join(__dirname, '../data/users');
    
    if (!fs.existsSync(usersDir)) {
      return res.json([]);
    }
    
    const files = fs.readdirSync(usersDir);
    const users = files.map(file => {
      const userData = fs.readFileSync(path.join(usersDir, file), 'utf8');
      return JSON.parse(userData);
    });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all products from file storage
// @route   GET /api/files/products
// @access  Private/Admin
router.get('/products', adminProtect, (req, res) => {
  try {
    const productsDir = path.join(__dirname, '../data/products');
    
    if (!fs.existsSync(productsDir)) {
      return res.json([]);
    }
    
    const files = fs.readdirSync(productsDir);
    const products = files.map(file => {
      const productData = fs.readFileSync(path.join(productsDir, file), 'utf8');
      return JSON.parse(productData);
    });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all orders from file storage
// @route   GET /api/files/orders
// @access  Private/Admin
router.get('/orders', adminProtect, (req, res) => {
  try {
    const ordersDir = path.join(__dirname, '../data/orders');
    
    if (!fs.existsSync(ordersDir)) {
      return res.json([]);
    }
    
    const files = fs.readdirSync(ordersDir);
    const orders = files.map(file => {
      const orderData = fs.readFileSync(path.join(ordersDir, file), 'utf8');
      return JSON.parse(orderData);
    });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;