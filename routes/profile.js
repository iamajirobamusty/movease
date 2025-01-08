const express = require('express');
const router = express.Router();
const { User } = require('../models')

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status('401').send('Unauthorized');
    }
}

router.get('/profile', isAuthenticated, (req, res, next) => {
    const session_user = req.session.user;
    const user = User.findOne({ name: session_user.username });
    console.log(user);
    render('profile', { user: user })
});

module.exports = router;