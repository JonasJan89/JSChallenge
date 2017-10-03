const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName : {
        type: String,
        required: [true, 'firstName is required']
    },
    lastName : {
        type: String,
        required: [true, 'lastName is required']
    },
    role: {
        type: String,
        required: [true, 'role is required']
    },
    emailAddress: {
        type: String,
        required: [true, 'emailAddress is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    matrNr: {
        type: Number,
        default: 0
    }
    }, {
    timestamps: {createdAt: 'timestamp'}
});

module.exports = mongoose.model('User', UserSchema);
