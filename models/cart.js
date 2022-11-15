const fs = require('fs');
const path = require('path');

var topModule = module;

while(topModule.parent)
  topModule = topModule.parent;

const p = path.join(
  path.dirname(topModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }
  /*static getCart() {
    fs.readFile(p, (err, fileContent) => {
       let cart = JSON.parse(fileContent);
       return cart;
      
    });
  }*/
  static deleteProduct(Id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(prod => prod.id == Id);
      console.log("----------------------ID");
      console.log(updatedCart.products.find(prod => prod.id == Id));
      
      const productQty = product.qty;
      console.log("----------------------qty");
      console.log(productQty);
      if(productQty===1){
        updatedCart.products = updatedCart.products.filter(prod => prod.id != Id);
        updatedCart.totalPrice - productPrice * productQty;
      }
      else{
        console.log("----------------------else");
        const productu= updatedCart.products.filter(prod => prod.id == Id);
        productu.qty=productQty;
        updatedCart.products = updatedCart.products.filter(prod => prod.id != Id);
        updatedCart.products = [...updatedCart.products, productu];
        console.log("----------------------produ");
        console.log(updatedCart.products);
        updatedCart.totalPrice = updatedCart.totalPrice - productPrice;
       
    }
      

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }
  static emptyCart() {
    const empty={"products":[],"totalPrice":0};
    fs.writeFile(p,JSON.stringify(empty), err => {
      console.log(err);
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }


 
};


