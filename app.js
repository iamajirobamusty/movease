import express, { request } from 'express';
import { mongoose } from 'mongoose';
import { User, Admin, Driver, getUser, getOneUser, createAdmin, createDriver, createUser } from './User/user.js';
import bcrypt from 'bcrypt';


const app = express();


app.use(express.urlencoded({extended: true}))

const dbName = 'movease';
const url = `mongodb://192.168.56.3:27017/${dbName}`;
mongoose.connect(url).then(() => console.log('Connected successfully')).catch((err) => console.log(err));




app.get('/', (req, res) => {
    res.send(req.headers);
    res.send('Hello')
});


app.post('/login', (req, res) => {
    if (User.findOne({emial: req.body.email}) && bcrypt.compare(User.password, req.body.password)) {
        console.log('Welcome')
    }
})

app.get('/login', (req, res) => {
    res.send(` <form action="/login" method="POST">
        <label for="username">Username:</label>
        <input type="text" id='username' name='username'></input>
        <label for="password">Password:</label>
        <input type='password' id='password' name='password'></input>
        <input type='submit' value='Login',/>
    </form>
    `)
})
app.post('/register', async (req, res) => { 
    console.log( await getOneUser(req.body.email))  
    if ( await getOneUser(req.body.email)){
        res.send('Email already used. Create with a unique email')
    } else {
        createUser(req.body.username, req.body.email, req.body.password)
        res.send('Created')
    }
});

app.get('/register', (req, res) => {
    
    res.send(` <form action="/register" method="POST">
        <label for="username">Username:</label>
        <input type="text" id='username' name='username'></input>
        <label for="email">Email:</label>
        <input type="text" id='email' name='email'></input>
        <label for="password">Password:</label>
        <input type='password' id='password' name='password'></input>
        <input type='submit' value='Register',/>
    </form>
    `)
    
});

app.post('/register/driver',(req, res) => {
    if (Driver.findOne({email: req.body.email})) {
        res.send('Email exists, create an account with a unique email');
    } else {
        createDriver();
    }
});

app.get('/register/driver', (req, res) => {
    res.send(` <form action="/login" method="POST">
        <label for="username">Username:</label>
        <input type="text" id='username' name='username'></input>
        <label for="plateNumber">Plate Number:</label>
        <input type="text" id='plateNumber' name='plateNumber'></input>
        <label for="email">Email:</label>
        <input type="text" id='email' name='email'></input>
        <label for="password">Password:</label>
        <input type='password' id='password' name='password'></input>
        <input type='submit' value='Login',/>
    </form>
    `)
})

app.post('/register/admin',(req, res) => {
    if (Admin.findOne({email: req.body.email})) {
        res.send('Email exists, create an account with a unique email');
    } else {
        createAdmin();
    }
});

app.get('/register/admin', (req, res) => {
    res.send(` <form action="/login" method="POST">
        <label for="username">Username:</label>
        <input type="text" id='username' name='username'></input>
        <label for="email">Email:</label>
        <input type="text" id='email' name='email'></input>
        <label for="password">Password:</label>
        <input type='password' id='password' name='password'></input>
        <input type='submit' value='Login',/>
    </form>
    `)
})

app.get('/home', (req, res) => {

});

app.get('/profile', (req, res) => {

});

app.listen(3000, () => {
    console.log('Serving on localhost:3000');
});