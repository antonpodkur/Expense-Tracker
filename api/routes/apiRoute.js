const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');


router.post('/register', async (req,res) => {
    console.log(req.body);
    const {email, password: plainTextPassword} = req.body;

    if(!email || typeof email !== 'string' ){
        return res.json({status: 'error', error: 'Invalid username'});
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string' ){
        return res.json({status: 'error', error: 'Invalid password'});
    }

    if(plainTextPassword.length < 6){
        return res.json({status: 'error', error: 'Password is too short. It should be atleast 6 characters'});
    }

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


module.exports = router;