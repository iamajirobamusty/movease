var express = require('express');
var router = express.Router();

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
})

module.exports = router;
