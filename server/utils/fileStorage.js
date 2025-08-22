const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
const createDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Storage for users
const saveUser = (user) => {
  try {
    createDirectory(path.join(__dirname, '../data/users'));
    fs.writeFileSync(
      path.join(__dirname, `../data/users/${user._id}.json`),
      JSON.stringify(user, null, 2)
    );
    return true;
  } catch (error) {
    console.error(`Error saving user to file: ${error.message}`);
    return false;
  }
};

// Storage for admins
const saveAdmin = (admin) => {
  try {
    createDirectory(path.join(__dirname, '../data/admins'));
    fs.writeFileSync(
      path.join(__dirname, `../data/admins/${admin._id}.json`),
      JSON.stringify(admin, null, 2)
    );
    return true;
  } catch (error) {
    console.error(`Error saving admin to file: ${error.message}`);
    return false;
  }
};

// Storage for products
const saveProduct = (product) => {
  try {
    createDirectory(path.join(__dirname, '../data/products'));
    fs.writeFileSync(
      path.join(__dirname, `../data/products/${product._id}.json`),
      JSON.stringify(product, null, 2)
    );
    return true;
  } catch (error) {
    console.error(`Error saving product to file: ${error.message}`);
    return false;
  }
};

// Storage for orders
const saveOrder = (order) => {
  try {
    createDirectory(path.join(__dirname, '../data/orders'));
    fs.writeFileSync(
      path.join(__dirname, `../data/orders/${order._id}.json`),
      JSON.stringify(order, null, 2)
    );
    return true;
  } catch (error) {
    console.error(`Error saving order to file: ${error.message}`);
    return false;
  }
};

// Delete file
const deleteFile = (type, id) => {
  try {
    const filePath = path.join(__dirname, `../data/${type}s/${id}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting file: ${error.message}`);
    return false;
  }
};

module.exports = {
  saveUser,
  saveAdmin,
  saveProduct,
  saveOrder,
  deleteFile,
};