const router = require('express').Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const responseList = require('../configs/response.config')
const User = require('../models/user.model')
const authenticateUser = require('../middlewares/auth.middleware')
require('dotenv').config()

router.get('/', (req, res) => {
    const bearerToken = req.headers?.authorization
    if (!bearerToken) {
        return res.status(401).json({message: responseList.MISSING_TOKEN})
    }
    const token = bearerToken.split(' ')[1]
    if (!token) {
        return res.status(401).json({message: responseList.MISSING_TOKEN})
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        return res.status(200).json({message: responseList.VALID_TOKEN, user: decodedToken.user})
    } catch (err) {
        if(err instanceof jwt.TokenExpiredError){
            return res.status(401).json({message: responseList.INVALID_TOKEN})
        }
        return res.status(500).json({message: responseList.SOMETHING_WRONG})
    }  
})

router.post('/', async (req, res) => {
    if (!req.body || !req.body.username || !req.body.email || !req.body.fullName || !req.body.password || !req.body.contactNo || !req.body.address) {
        return res.status(400).json({message: responseList.BAD_REQUEST})
    }
    req.body.seller = !!req.body?.seller
    console.log(req.body)
    try {
        const user = new User(req.body)
        await user.save()
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '8h'})
        const userInfo = {
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        }
        return res.status(200).json({message: responseList.CREATED_SUCCESS, user: {token, ...userInfo}})
    } catch (err) {
        console.log(err)
        if (err.name === 'MongoServerError' && err.code === 11000) {
            return res.status(400).json({message: responseList.DUPLICATE_USERNAME_EMAIL})
        }
        return res.status(500).json({message: responseList.SOMETHING_WRONG})
    }
})

router.post('/login', async (req, res) => {
    if (!req.body || !req.body.username || !req.body.password) {
        return res.status(400).json({message: responseList.MISSING_USERNAME_PASSWORD})
    }
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) {
            return res.status(400).json({message: responseList.USER_PASSWORD_ERROR})
        }
        if (!user.isValidPassword(req.body.password)) {
            return res.status(400).json({message: responseList.USER_PASSWORD_ERROR})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '8h'})
        const userInfo = {
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        }
        return res.status(200).json({user: {token, ...userInfo}})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: responseList.SOMETHING_WRONG})
    }
})

module.exports = router