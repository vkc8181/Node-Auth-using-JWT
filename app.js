require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authMiddleware = require('./middlewares/auth.middleware');



const port = process.env.PORT || 3000;
const dbUrl=process.env.DB_URL;



mongoose.connect(dbUrl).then((r)=>{console.log("DB Connected")}).catch((err)=>{console.log("DB cannot be connected",err)});



app.use(express.json());    //To parse the body of incoming req
app.use(cookieParser());
app.use(require('./routes/auth.route'));



app.get('/',(req, res) => {
    res.send('vkccc');
});

app.get('/dashboard', authMiddleware.reqAuth, (req, res) => {
    res.send('<h1>Welcome to dashboard</h1>');
});



app.listen(port,()=>{
    console.log('Running on port',port);
});