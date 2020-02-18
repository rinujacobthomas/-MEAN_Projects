const mongoose = require('mongoose')
console.log('in schema ');

const Schema= mongoose.Schema;
const UserSchema= new Schema({
    first_name:{
        type :String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const users=mongoose.model('loginDetails',UserSchema);
module.exports=users;