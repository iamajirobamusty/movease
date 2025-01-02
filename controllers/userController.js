const { User } = require('../models');


const createUser = async (req) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        console.log(savedUser)
        return (savedUser)
    } catch (err) {
        return err.message;
    }
};

const getUser = async (req) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return "User not found";
        return user;
    } catch (err) {
        return err.message
    }
}

const updateUser = async (req) => {
    try {
        const updatedUser = await User.findById(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!updatedUser) return 'User not found';
        return (updateUser);
    } catch (err) {
        return err.message;
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return "User not found";
        return "User deleted successfully";
    } catch (err) {
        return err.message;
    }
}
module.exports = { createUser, getUser, updateUser, deleteUser };