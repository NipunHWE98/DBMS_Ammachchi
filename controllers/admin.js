const Food_item = require('../models/food_item');
const Product = require('../models/product');
const Employee=require('../models/employee');
const e = require('express');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};
exports.getAddEmployee=(req,res,next)=>{
  Employee.fetchAll()
    .then(([rows, fieldData]) => { 
  res.render('admin/edit-employee',{
    pageTitle: 'Add Employee',
    path: '/admin/add-employee',
    editing: false,
    userData:rows
  });
 
})
.catch(err => console.log(err));


};

exports.postAddEmployee = (req, res, next) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const contact_no = req.body.contact_no;
  const employee = new Employee(null, first_name,last_name,email,contact_no);
  employee
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const employeeSsn=req.body.essn;
  const availability=1;
  const food_item = new Food_item(null, name, imageUrl, description, price,availability,employeeSsn);
  food_item
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Food_item.findById(prodId).then(product=>{
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product[0]
    });
  }).catch(err=>console.log(err)) ;
};

exports.postEditfoodItem = (req, res, next) => {
 
  const id = req.body.productId;
  const updatedName = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const Availability=1;
  const updatedessn=req.body.essn;
  const updatedProduct = new Food_item(
    id,
    updatedName,
    updatedImageUrl,
    updatedDesc,
    updatedPrice,
    Availability,
    updatedessn
  );
  updatedProduct.update(id).then(prod=>{res.redirect('/admin/products');}).catch(err=>console.log(err));
  
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Food_item.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err));
};
exports.postDeleteFoodItem = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId)
  Food_item.deleteById(prodId).then(func=>{res.redirect('/admin/products');}).catch(err=>console.log(err));
  
};
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};
