const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/register', shopController.getRegister);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.get('/add-complain',shopController.getAddComplain);

router.post('/add-complain',shopController.postAddComplain);

router.post('/signup',shopController.postSignup);

router.post('/place-order',shopController.postOrder);

module.exports = router;
