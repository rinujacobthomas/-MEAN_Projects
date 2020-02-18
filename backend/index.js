const express = require('express');
const app = express();
const mongoose= require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const users=require('./routes/users');
app.use(users);
app.use(cors()); 
const url="mongodb://127.0.0.1:27017/usersDetails";
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('connected to userDetails database'))
.catch((error)=>console.log(error))
const port = 3000;

app.listen(port, () => console.log(`backend is on port 3000`))