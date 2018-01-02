var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

//GET about
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

//GET contact
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

//GET register
router.get('/register', function(req,res,next) {
    return res.send('Registered today!!');
});

router.post('/register', function(re,res,next) {
  return res.send('User created!!');
})

module.exports = router;
