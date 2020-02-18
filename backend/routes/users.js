const express=require('express');
const users=express.Router();
const cors=require('cors');
const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt');
const loginDetails=require('../models/mongoose');
users.use(cors());
process.env.SECRET_KEY='secret';

//                                                  register route
users.post('/register',(req,res)=>{
    const today= new Date();
   // res.send(req.body);
    console.log('in post request for registration');
    
    const userData={
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        date:today
    }
    loginDetails.findOne({
        email:req.body.email
    })
    .then((user)=>{
        if(!user)
        {
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                userData.password=hash;
                loginDetails.create(userData);
            })
        }
        else
        {
            res.json({error:'usere already found'});
        }
    })
});
//                                                        login route
users.post('/login',(req,res)=>{
    console.log('in login');
    
loginDetails.findOne({email:req.body.email})
.then(user=>{
    if(user)
    {
        if(bcrypt.compareSync(req.body.password,user.password))
        {
            const payload={
                id:user._id,
                first_name:user.first_name,
                last_name:user.last_name,
                email:user.email
            };
            let token=jwt.sign(payload,process.env.SECRET_KEY);
            res.json({token});
        }
        else{
            res.json({error:'password incorrect'})
        }
    }
    else
    {
        res.json({error:'user not found'});
    } 
})
.catch(error=>{
    res.send(error)
})
})
//                                          get  for profile  details
users.get('/userData',(req,res)=>{
    console.log('in userData');
    
    //const decoded=jwt.verify(req.headers['authorization'],process.env.SECRET_KEY);
    loginDetails.find()
    .then(user=>{
        if(user)
        {
            res.json(user);
        }
        else
        {
            res.json({error:'timeout'})
        }
    })
})
users.get('/user',(req,res)=>{ 
    const decordData=jwt.verify(req.headers.authorization,process.env.SECRET_KEY);
    res.json(decordData);
    //console.log(decordData);
})
users.put('/editDetails/:id',(req,res)=>{
    console.log('in edit');
    console.log(req.body);
    console.log(req.params.id);
    
    
    loginDetails.findOneAndUpdate({_id:req.params.id},req.body,)
    .then(data=>console.log(data))
    .catch(err=>console.log(err)
    )
})
module.exports=users;