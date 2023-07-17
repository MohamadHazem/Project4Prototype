const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: 'https://placehold.co/200x200',
    },
    seller: {
        type: Boolean,
        default: false
    },
    cart: [{
        type: mongoose.ObjectId,
        ref: 'Art',
    }],
    art: [{
        type: mongoose.ObjectId,
        ref: 'Art',
    }],
})

userSchema.pre("save", function (next) {
    const user = this
    if (!user.isModified("password")) {
        return next()
    }
    user.password = bcrypt.hashSync(user.password, 10)
    next()
})

userSchema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema)

module.exports = User