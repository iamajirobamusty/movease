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
})

module.exports = router;
