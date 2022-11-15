const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/logout', authController.getLogout);

router.get('/logout-customer', authController.getLogoutCustomer);

router.get('/userSelect', authController.getUserSlect);

router.get('/employee-login',authController.getEmployeeLogin);

router.get('/customer-login',authController.getCustomerLogin);

router.post('/employee-login',authController.postEmployeeLogin);

module.exports = router;