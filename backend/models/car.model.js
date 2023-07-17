const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    img: {
        type: String,
        required: false,
    },
    deleted: Boolean,
    createdBy: {
        user: {
            type: mongoose.ObjectId,
            ref: 'User',
        },
        username: {
            type: String,
            required: false,
        },
        fullName: {
            type: String,
            required: false,
        }
    }
}, {timestamps: true})

const Car = mongoose.model('Car', carSchema)

module.exports = Car