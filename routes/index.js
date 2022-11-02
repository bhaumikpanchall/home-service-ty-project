var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Express' });
});

//about 
router.get('/about',function(req, res) {
  res.render('about');
});

router.get('/contact', function(req, res) {
  res.render('contact');
});

router.get('/service', function(req, res) {
  res.render('service');
});

router.get('/booking', function(req, res) {
  res.render('booking');
});
router.get('/admin', function(req, res) {
  res.render('admin/admin');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});


router.get('/register', function(req, res, next) {
  res.render('register');
});



module.exports = router;
