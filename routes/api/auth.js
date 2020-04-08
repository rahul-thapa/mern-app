const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// User model

const User = require('../../models/User')

// ROUTES

// @route POST api/auth
// @desc authenticate the user
// @access Public

router.post('/', (req,res)=>{
    const {email, password} = req.body

    // validation

    if(!email || !password){
        return res.status(400).json({msg: "Please enter all fields"})
    }
    // Check existing user

    User.findOne({email})
    .then(user =>{
        if(!user){
            return res.status(400).json({msg: "User does not exists"})
        }


        // Validate password

        bcrypt.compare(password, user.password)
        .then(isMatch=>{
            if(!isMatch) return res.status(400).json({msg: "incorrect email or password"})

            jwt.sign(
                {id:user.id},
                config.get('jwtSecret'),
                {expiresIn: 3600},
                (err,token)=>{
                    if(err) throw(err)
    
                    res.json({
                        token,
                        user:{
                            id: user.id,
                            name: user.name,
                            email: user.email
                       }
                   })
    
                }
            
            )
        })
        
        
        
    })
    // .catch(err=>console.log(err))
})

// @route GET api/auth/user
// @desc Get User Data
// @access Private\

router.get('/user',auth, (req, res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user=>res.json(user))
})

module.exports = router