const express = require('express')
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require ('../models/user');
const Serija = require('../models/serija');

const signToken = UserID => {
    return JWT.sign({
        iss : "OAWRA",
        sub : UserID
    }, "OARWA",{expiresIn: "1h"})
}

userRouter.post('/register',(req,res)=>{
    const {email,username,password} = req.body;
    User.findOne({username},(err,user)=> {
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured.", msgError : true}});
        if(user)
            res.status(400).json({message : {msgBody : "Username is already taken.", msgError : true}});
        else {
            const newUser = new User({email, username,password});
            newUser.save(err => {
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured.", msgError : true}});
                else
                    res.status(201).json({message : {msgBody : "Account successfully created..", msgError : false}});
            })
        }
    });

});

userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
        const {_id,username,email} = req.user;
        const token = signToken(_id);
        res.cookie('access_token',token,{httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated : true,user : {username,email}})
    }
});

userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{username : "",email : ""}, success : true});
});

userRouter.post('/serija',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const serija = new Serija(req.body);
    serija.save(err => {
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured.", msgError : true}});
        else{
            req.user.serije.push(serija);
            req.user.save(err => {
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured.", msgError : true}});
                else{
                    res.status(200).json({message : {msgBody : "Successfully added a serie.", msgError : false}});
                }
            })
        }
    })
});

userRouter.get('/serije',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate('serije').exec((err,document)=> {
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured.", msgError : true}});
        else 
            res.status(200).json({serije : document.serije, authenticate : true});
    });
});

userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username,email} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username, email}});
});

userRouter.delete('/:id',(req,res,next) => {
    const id = req.params.id
    Serija.findByIdAndRemove(id).then(result => {
        res.status(204).end()
    })
        .catch(err => next(err))
})

userRouter.put('/:id',(req,res,next)=>{
    const id = req.params.id
    const podatak = req.body

    const serija = {
        naziv: podatak.naziv,
        pogledano: podatak.pogledano
    }

    Serija.findByIdAndUpdate(id, serija, {new: true}).then(serija => {
        res.json(serija)
    })
})
module.exports = userRouter;