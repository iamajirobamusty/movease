import { mongoose } from "mongoose"
import {v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

 let userSchema = new mongoose.Schema({
    _id: {type: String, default: uuidv4},
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

 let driverSchema = new mongoose.Schema({
    _id: {type: String, default: uuidv4},
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    plateNumber: {type: String, default: uuidv4, required: true},
})

 let adminSchema = new mongoose.Schema({
    _id: {type: String, default: uuidv4},
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})



userSchema.pre('save', async function (next) {
    let user = this;

    if(!user.isModified('password')) {
        return next();
    }

    try {
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch(err) {
        next(err);
    }
})

driverSchema.pre('save', async function (next) {
    let user = this;

    if(!user.isModified('password')) {
        return next();
    }

    try {
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch(err) {
        next(err);
    }
})

adminSchema.pre('save', async function (next) {
    let user = this;

    if(!user.isModified('password')) {
        return next();
    }

    try {
        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch(err) {
        next(err);
    }
})

export let createUser = async (username, email, password, next) => {
    let newUser = new User({
        username: username,
        email: email,
        password: password,
    });
    await newUser.save();
    console.log('User created with UUID:', newUser._id);
   
    
};

export let createAdmin = async (username, email, password) => {
    let newAdmin = new Admin({
        username: username,
        email: email,
        password: email,
        plateNumber: plateNumber
    });

    await newAdmin.save();
    console.log('User created with UUID:', newUser._id);
    
};

export let createDriver = async (username, email, password, plateNumber) => {
    let newDriver = new Driver({
        username: username,
        email: email,
        password: email,
        plateNumber: plateNumber
    });

    await newDriver.save();
    console.log('User created with UUID:', newUser._id);
    
};

export async function getUser() {
    try {
        const user = await User.find({});
        return true
    } catch(err) {
        console.error(err)
    }
}

export async function getOneUser(email) {
    const user = await User.findOne({email: email})
    if (user) {
        console.log(User.email)
        return true;
    } else {
        return false;
    }
}

export let User = mongoose.model('User', userSchema);
export let Admin = mongoose.model('Admin', adminSchema);
export let Driver = mongoose.model('Driver', driverSchema);