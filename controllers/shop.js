const Product = require('../models/product');
const Food_item = require('../models/food_item');
const Cart = require('../models/cart');
const Complain=require('../models/complain');
const Employee=require('../models/employee');
const session = require('express-session');
const Customer=require('../models/customer');
const Order=require('../models/order');


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
exports.postOrder=(req,res,next)=>{
  console.log(session);
  //console.log("Is logged in"+req.session.role);
 // if(req.session.isLoggedIn){

  

Order.getOrderID().then((orderID)=>{


  Cart.getCart(cart => {
    let date_ob = new Date();

      const order_id=  orderID;
      const order_place_time = date_ob.getHours()+":"+date_ob.getMinutes() ;
      const order_pickup_time = null;
      const cus_id=1;
      const charge=cart.totalPrice;
      const date=date_ob;
      console.log(order_place_time);
      const order=new Order(order_id,order_place_time,order_pickup_time,cus_id,charge,date);
      order.addOrder().then(( )=>{console.log(req.session.tid);
        
    Food_item.fetchAll().then(products => {
      
      const cartProducts = [];
      
      for (product of products[0]) {
          const cartProductData = cart.products.find(
          prod => prod.id === product.ID
        );
         
        if (cartProductData) {
         

          Employee.getEmployeeByFood(cartProductData.id).then(em_id=>{
            console.log(cartProductData.id);
            order.addFoodOrder(orderID[0][0].ID,cartProductData.id,cartProductData.qty,em_id[0][0].Employee_Ssn);
          }).catch(err=>console.log(err));         
        }
      }
    }).catch(err => console.log(err));}).catch(err=>console.log(err)); 
  });
  res.redirect('back');
  Cart.emptyCart();
  
  
}).catch(err=>console.log(err));
 // }
  //else{
   // res.redirect('/login');
 // }

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
  Customer.findpendingOrders(1).then(data => {
    console.log(data[0]);
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
    isLoggedin:req.session.isLoggedIn,
        role:req.session.role,
        data:data[0]
  });
})
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',isLoggedin:req.session.isLoggedIn,
    role:req.session.role
  });
};
