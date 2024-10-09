import express from 'express';
import { mongoose } from 'mongoose';

const app = express();

const url = 'mongodb://192.168.56.3:27017';

const dbName = 'movease';

mongoose.connect('url', {
    userNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected successfully')).catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send(req.headers);
    res.send('Hello')
});

app.get('/login', (req, res) => {

});

app.get('/register',(req, res) => {

});

app.get('/home', (req, res) => {

});

app.get('/profile', (req, res) => {

});

app.listen(3000, () => {
    console.log('Serving on localhost:3000');
});
