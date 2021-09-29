const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type : String,
        required : true,
    },
    username: {
        type : String,
        required : true,
    },
    password : {
        type : String,
        require : true
    },
    serije : [{type : mongoose.Schema.Types.ObjectId, ref:'Serija'}]
});

UserSchema.pre('save',function(next){
    if(!this.isModified('password')){
        return next()
    }
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
            return next()
        this.password = passwordHash;
        next();
    });
});

UserSchema.methods.comparePassword = function (password, cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
            return cb(err);
        else{
            if(!isMatch){
                return cb(null,isMatch);
            }
            return cb(null,this);
        }
    });
} 
module.exports = mongoose.model('User',UserSchema,'users' );