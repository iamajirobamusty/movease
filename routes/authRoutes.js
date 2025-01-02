const express = require('express');
const router = express.Router();
const { createUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { User } = require('../models')

/* GET home page. */
router.get('/register', function (req, res, next) {
    res.render('registration', { title: 'Register' });
});

router.post('/register', (req, res, next) => {
    const user = createUser(req);
    res.render('home_page', { title: "Home Page" })
});

router.post('/login', (req, res, next) => {
    const { name, email, password } = req.body;
    console.log(name, email, password)
    res.render('home_page', { title: "Home Page" })
});

router.get('/login', (req, res, next) => {
    res.render('login', { title: "Login" })
})

module.exports = router;
