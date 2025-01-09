var express = require('express');
var router = express.Router();
const { User } = require('../models');

//Protect route
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', isAuthenticated, (req, res, next) => {
  res.render('home_page', { title: 'Home Page' })
});

router.get('/profile', isAuthenticated, async (req, res, next) => {
  const session_user = req.session.user;
  const user = await User.findOne({ name: session_user.username })
  console.log(user);
  res.render('profile', { user: user, title: "Profile Page" })
});

router.get('/profile/:user', (req, res) => {
  res.render('profile', { user: req.params.user });
})

router.get('/search', (req, res) => {
  const query = req.query.query;
  const user = User.findOne({ email: query });
  res.redirect('/profile/user')
})

module.exports = router;
