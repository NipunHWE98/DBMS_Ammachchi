global.isLoggedIn=false;
const Employee=require('../models/employee');

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
    isLoggedin:req.session.isLoggedIn
  });
};
  exports.getUserSlect = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('auth/userSelect', {
    path: '/userSelect',
    pageTitle: 'User Select',
    isAuthenticated: false,
    isLoggedin:req.session.isLoggedIn
  });
};
exports.getEmployeeLogin = (req, res, next) => {
  res.render('auth/employee-login', {
    path: '/employee-login',
    pageTitle: 'Employee Login',
    isAuthenticated: false,
    isLoggedin:req.session.isLoggedIn
  });
};
exports.postEmployeeLogin = (req, res, next) => {

  req.session.isLoggedIn = true;
  const detail=req.body;
  console.log(detail.role);
  switch(detail.role){
    case 'admin':
      
      req.session.role = 'Admin';
      req.session.tid='1';
      res.redirect('/');
      break;
    case 'chef':
     
      req.session.role = 'Chef';
      req.session.tid='2';
      Employee.employeeLogin(3);
      res.redirect('/');
      break;
    case 'cashier':
      
      req.session.role = 'Cashier';
      req.session.tid='3';
      res.redirect('/');
  }
 
};
exports.getCustomerLogin=(req,res,next)=>{
  res.redirect('/login',);
  
  
};
exports.getLogout = (req, res, next) => {
  req.session.isLoggedIn=false;
  req.session.role=' ';
  res.redirect('/');
};
exports.getLogoutCustomer = (req, res, next) => {
  req.session.isLoggedIn=false;
  Employee.employeeLogout(3);
  req.session.role=' ';

  res.redirect('/');
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  req.session.role = 'Customer';
  req.session.tid='1';
  res.redirect('/');
};
