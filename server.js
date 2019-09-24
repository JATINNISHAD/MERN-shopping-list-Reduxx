const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongourl;
const path = require('path');

const items = require('./routes/api/items');


//Database connection
mongoose.connect(db)
.then(()=>console.log("connected to the database"))
.catch((err)=>console.log(err));

//server
const app = express();
app.use(bodyParser.json());

//routes
app.use('/api/items',items);


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log('server'));