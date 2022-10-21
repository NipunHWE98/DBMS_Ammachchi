const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

router.get('/add-product/:Employee_Ssn', adminController.getAddProductwithID);
// /admin/add-employee=>get
router.get('/add-employee', adminController.getAddEmployee);
// /admin/products => GET
router.get('/products', adminController.getProducts);
//add role
router.get('/add-role/:employeeId',adminController.getAddRole);
router.post('/add-role/',adminController.postAddRole);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /admin/add-employee => POST
router.post('/add-employee', adminController.postAddEmployee);

router.post('/delete-employee',adminController.postDeleteEmployee);

router.get('/edit-employee/:employeeId', adminController.getEditEmployee);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-employee', adminController.postEditEmployee);

router.post('/edit-product', adminController.postEditfoodItem);

router.post('/delete-product', adminController.postDeleteFoodItem);

module.exports = router;
