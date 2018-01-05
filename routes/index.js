const express = require('express');
const router = express.Router();
const User = require('../models/user');


//POST login
router.post('/login', (req, res, next) => {
  return res.redirect('/profile');
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Home'
  });
});

//GET about
router.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'About'
  });
});

//GET contact
router.get('/contact', (req, res, next) => {
  res.render('contact', {
    title: 'Contact'
  });
});

//GET register
router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Register'
  });
});

router.post('/register', (req, res, next) => {
  if (req.body.email && req.body.name && req.body.favoriteBook && req.body.password && req.body.confirmPassword) {
    //confirm that user typed the same password twice
    if (req.body.password !== req.body.confirmPassword) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      console.log(next(err));
      return next(err);
      //create object with form input
    }
    console.log('data::', req.body.email, req.body.name, req.body.favoriteBook, req.body.password);
    var userData = {
      email: req.body.email,
      name: req.body.name,
      favoriteBook: req.body.favoriteBook,
      password: req.body.password
    };
    //user schema's 'create' method to insert document into mongo
    User.create(userData, (error, user) => {
      if (error) {
        return next(err);
      } else {
        return res.redirect('/profile');
      }
    });

  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    console.log(next(err));
    return next(err);
  }
});

//GET login
router.get('/login', (req, res, next) => {
    return res.render('login', {
    title: 'login'
  });
});

module.exports = router;
