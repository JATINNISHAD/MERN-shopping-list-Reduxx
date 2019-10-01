const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');



//Database connection
const db = config.get('mongourl');

mongoose.connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true
})
.then(()=>console.log("connected to the database"))
.catch((err)=>console.log(err));

//server
const app = express();
app.use(express.json());

//routes
app.use('/api/items',items);
app.use('/api/users',users);
app.use('/api/auth',auth);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log('server'));