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


app.post('/login', async (req, res) => {
    let user = await getOneUser(req.body.email)
    if (user && bcrypt.compare(req.body.password, user.password)) {
        res.send('OK')
    } else {
        res.send('Username or password incorrect')
    }
})

app.get('/login', (req, res) => {
    res.send(` <form action="/login" method="POST">
        <label for="email">email:</label>
        <input type="text" id='email' name='email'></input>
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

app.post('/register/driver', async (req, res) => {
    if ( await Driver.findOne({email: req.body.email})) {
        res.send('Email exists, create an account with a unique email');
    } else {
        createDriver(req.body.username, req.body.email, req.body.password, req.body.plateNumber);
        res.send('created')
    }
});

app.get('/register/driver', (req, res) => {
    res.send(` <form action="/register/driver" method="POST">
        <label for="username">Username:</label>
        <input type="text" id='username' name='username'></input>
        <label for="plateNumber">Plate Number:</label>
        <input type="text" id='plateNumber' name='plateNumber'></input>
        <label for="email">Email:</label>
        <input type="text" id='email' name='email'></input>
        <label for="password">Password:</label>
        <input type='password' id='password' name='password'></input>
        <input type='submit' value='Register',/>
    </form>
    `)
})

app.post('/register/admin',(req, res) => {
    if (Admin.findOne({email: req.body.email})) {
        res.send('Email exists, create an account with a unique email');
    } else {
        createAdmin(req.body.username, req.body.email, req.body.password);
    }
});

app.get('/register/admin', (req, res) => {
    res.send(` <form action="/register/admin" method="POST">
        <label for="username">Username:</label>
        <input type="text" id='username' name='username'></input>
        <label for="email">Email:</label>
        <input type="text" id='email' name='email'></input>
        <label for="password">Password:</label>
        <input type='password' id='password' name='password'></input>
        <input type='submit' value='Register',/>
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