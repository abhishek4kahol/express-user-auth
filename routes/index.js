const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mid = require('../middleware');

//GET about
router.get('/profile', (req, res, next) => {
  if(! req.session.userId){
    var err = new Error('You are not authorized to view this page.');
    err.status= 403;
    return next(err);
  }
  console.log('123');
  User.findById(req.session.userId)
    .exec((error,user) => {
      if(error) {
        return next(error);
      } else {
        return res.render('profile', {title:'Profile', name:user.name, favoriteBook: user.favoriteBook});
      }
    })
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
router.get('/register', mid.loggedOut, (req, res, next) => {
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
        req.session.userId = user._id;
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
router.get('/login', mid.loggedOut, (req, res, next) => {
    return res.render('login', {
    title: 'login'
  });
});

//POST login
router.post('/login', (req, res, next) => {
  if (req.body.email && req.body.password) {
User.authenticate(req.body.email,req.body.password, (error, user) => {
  if(error || !user){
    var err = new Error('Wrong email or password');
    err.status = 401;
    return next(err);
  } else {
    req.session.userId = user._id;
    return res.redirect('/profile');
  }

});
  } else {
    var err = new Error('Email and Password are required.');
    err.status = 401;
    console.log(next(err));
    return next(err);
  }
    });

//GET logout
router.get('/logout', (req, res, next) => {
  if(req.session) {
    req.session.destroy((err)=>{
      if(err){
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
module.exports = router;
