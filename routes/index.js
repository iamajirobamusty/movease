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
});

router.get('/settings', async (req, res) => {
  const name = req.session.user;
  const user = await User.findOne({ name: name })
  await user.populate('visited_locations', 'street city');
  res.render('settings', { user: user })
});

router.post('/settings', async (req, res) => {
  let email = req.body.email;
  let phoneNumber = req.body.phone;
  let password = req.body.password;
  const name = req.session.user;
  let user = await User.findOne({ name: name });

  if (!email && email !== user.email) {
    user.email = email
    await user.save();
  }
  if (!phoneNumber && phoneNumber !== user.phoneNumber) {
    user.phoneNumber = phoneNumber;
    await user.save();
  }
  if (!password && password !== user.password) {
    user.password = password;
    await user.save();
  }

  res.redirect('settings');
})

module.exports = router;
