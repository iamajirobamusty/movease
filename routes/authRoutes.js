const express = require('express');
const { body, validationResult, matchedData } = require('express-validator');
const router = express.Router();
const { createUser, getUser, updateUser, deleteUser } = require('../controllers/userController');
const { User } = require('../models')
const bcrypt = require('bcrypt');


router.post('/register',
    [
        body('name')
            .isString()
            .withMessage('Name cannot contain a number.')
            .trim()
            .escape(),
        body('email')
            .isEmail()
            .withMessage('Invalid email! Kindly provide a valid email address.')
            .custom(async (value) => {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error("Email already in use, Kindly provide a unique email");
                }
                return true;
            })
            .normalizeEmail()
            .trim()
            .escape(),
        body('password')
            .matches(/[A-Z]/)
            .withMessage("Password must contain at least one uppercase letter")
            .matches(/\d/)
            .withMessage("Password must contain at least one number")
            .isLength({ min: 8 })
            .withMessage("Password must be of minimum of 8 characters!")
            .matches(/[a-z]/)
            .withMessage("Password must contain at least one lower case letter")
            .matches(/[!@#$%^&*()<>,.?":{}|]/)
            .withMessage('Password must contain at least a special character')
            .trim(),
        body('confirm-password')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password does not match');
                }
                return true;
            })

    ],
    async (req, res, next) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            //const errorMessage = {};
            //result.array().forEach((error) => {
             //   errorMessage[`${error.param}Error`] = error.msg;
            //});
            // const queryParams = new URLSearchParams(errorMessage).toString();
            const errors = result.array();
            return res.render('registration', { title: 'Registration Page', errors: errors });
        }
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = createUser(req.body.name, req.body.email, hashedPassword);
        return res.redirect('/home');
    });

router.get('/register', (req, res, next) => {
    res.render('registration', { title: "Registration Page", errors : [] })
});

router.post('/login',
    [
        body('email')
            .isEmail()
            .withMessage('Invalid email! Kindly provide a valid email address.')
            .custom(async (value) => {
                const user = await User.findOne({ email: value });
                if (!user) {
                    throw new Error("This user does not exist.");
                }
                return true;
            })
            .normalizeEmail()
            .trim()
            .escape(),
    ],
     async (req, res, next) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            return res.redirect('/home')
        }
        const errors = result.array();
        res.render('login', { title: "Login", errors: errors })
});

router.get('/login', (req, res, next) => {
    res.render('login', { title: "Login", errors: [] })
})

module.exports = router;

