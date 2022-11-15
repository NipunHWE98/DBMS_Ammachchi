const Product = require('../models/product');
const Food_item = require('../models/food_item');
const Cart = require('../models/cart');
const Complain=require('../models/complain');
const Employee=require('../models/employee');
const session = require('express-session');
const Customer=require('../models/customer');


exports.getProducts = (req, res, next) => {
  Food_item.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products',
        isLoggedin:req.session.isLoggedIn,
        role:req.session.role
      });
    })
    .catch(err => console.log(err));
};

exports.getRegister = (req, res, next) => {
  console.log("getRegister");
  res.render('shop/register', {pageTitle: 'Register', path: '/register',role:req.session.role,
  isLoggedin:req.session.isLoggedIn});
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Food_item.findById(prodId)
    .then(([product]) => {
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product.title,
        path: '/products',
        isLoggedin:req.session.isLoggedIn,
        role:req.session.role

      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  Food_item.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/',
        role:req.session.role,
        isLoggedin:req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  /*Cart.getCart(cart => {
    Food_item.fetchAll().then(products => {
      console.log(products);
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.ID
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts,
        isLoggedin:req.session.isLoggedIn,
        role:req.session.role
      });
    }).catch(err => console.log(err));
  });*/

  
    Cart.getCart(cart => {
      
      Food_item.fetchAll().then(products => {
        
        const cartProducts = [];
        
        for (product of products[0]) {
            const cartProductData = cart.products.find(
            prod => prod.id === product.ID
          );
          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty });
          }
        }
        console.log("----------------------");

        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartProducts,
          Price:cart.totalPrice,
          isLoggedin:req.session.isLoggedIn,
          role:req.session.role
        });
      }).catch(err => console.log(err));
    });
  };
  
 
  /* res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    isLoggedin:req.session.isLoggedIn,
    role:req.session.role,
    products:[]
  });*/
  
  


exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Food_item.findById(prodId).then( product => {

    Cart.addProduct(product[0][0].ID, product[0][0].Price);
  }).catch(err=>console.log(err));
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  
  Food_item.findById(prodId).then( product => {
    Cart.deleteProduct(prodId, product.Price);
    res.redirect('/');
  });
};

exports.getAddComplain=(req,res,next)=>{
  res.render('shop/add-complain',{
    path: '/add-complain',
    pageTitle: 'Add a Complain',
    isLoggedin:req.session.isLoggedIn,
        role:req.session.role
  });
};

exports.postSignup=(req,res,next)=>{
  console.log("Signup called");
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;
  const password=req.body.password;
  const contact_no=req.body.contact_no;
  
  const customer=new Customer(firstname,lastname,email,contact_no,password);
  customer.save().then(res.redirect('/')).catch(err=>console.log(err));

};
exports.postAddComplain=(req,res,next)=>{
const cus_id=2;
const name=req.body.name;
const discription=req.body.complain;
const email=req.body.email;
const newcomplain=new Complain(cus_id,name,email,discription);
newcomplain.save().then(res.redirect('/')).catch(err=>console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
    isLoggedin:req.session.isLoggedIn,
        role:req.session.role
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',isLoggedin:req.session.isLoggedIn,
    role:req.session.role
  });
};
