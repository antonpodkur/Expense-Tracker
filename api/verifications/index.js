const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const {token} = req.body;

    if(!token){
        res.json({status: 'error', error: 'Token is abscent'});
    }  
    else {
        try{
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = user.id;
            next();
        }catch(e) {
            res.json({status: 'error', error: 'Failed to authenticate'});
        }
        
    }
}

const verifyEmail = (req,res,next) => {
    const {email} = req.body;

    if(!email || typeof email !== 'string' ){
        return res.json({status: 'error', error: 'Invalid email'});
    }

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(email.match(validRegex)) {
        req.email = email
        next();
    }else {
        return res.json({status: 'error', error: 'Invalid email'});
    }
}

const verifyPassword = (req, res, next) => {
    const { password } = req.body;

    if(!password || typeof password !== 'string' ){
        return res.json({status: 'error', error: 'Invalid password'});
    }

    if(password.length < 6){
        return res.json({status: 'error', error: 'Password is too short. It should be atleast 6 characters'});
    }

    req.plainTextPassword = password;
    next();
}

module.exports = {
    verifyJWT,
    verifyEmail,
    verifyPassword,
}