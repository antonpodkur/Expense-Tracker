const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {verifyJWT, verifyEmail, verifyPassword} = require('../verifications');


router.post('/register', verifyEmail, verifyPassword, async (req,res) => {
    console.log(req.body);

    const {email, plainTextPassword} = req;

    const password = await bcrypt.hash(plainTextPassword, 10);
    try{
        const user = await User.create({email, password});
        console.log("User has been created!",user);
    }catch(e){
        console.log(e.message);
        if(e.code === 11000) {
            return res.json({status: 'error', error: 'Email is already is use!'});
        }
        throw e;
    }
    res.json({status: 'ok'});
});


router.post('/login', verifyEmail, verifyPassword, async (req,res) => {

    const {email, plainTextPassword} = req;

    const user = await User.findOne({email}).lean();

    if(!user) {
        return res.json({status: 'error', error: 'Invalid username/password'});
    }

    if( await bcrypt.compare(plainTextPassword, user.password)){
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
        return res.json({status: 'ok', data: token});
    }

    res.json({status: 'error', error: 'Invalid username/password'});
});

router.post('/change-password', verifyJWT, verifyPassword, async (req,res) => {
    const newpassword = req.plainTextPassword;
    const _id = req.userId;


    const hashedPassword = await bcrypt.hash(newpassword, 10);
    await User.updateOne( {_id},{
        $set: {password: hashedPassword}
        } 
    )
    res.json({status: 'ok'});

})


module.exports = router;