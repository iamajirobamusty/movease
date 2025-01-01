var express = require('express');
var router = express.Router();
const { createUser, getUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');

/* GET users listing. */
router.get('/', getUsers);
/* GET user profile */
router.get('/:id', getUser);
/* create user */
router.post('/', createUser);
/* delete user */
router.delete('/:id', deleteUser);
/* update user */
router.put('/:id', updateUser)



module.exports = router;
