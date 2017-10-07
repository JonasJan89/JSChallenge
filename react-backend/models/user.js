const mongoose = require('mongoose');
const Schema = mongoose.Schema;

toLower = (v) => {
    return v.toLowerCase();
};

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
        set: toLower,
        required: [true, 'role is required']
    },
    emailAddress: {
        type: String,
        set: toLower,
        required: [true, 'emailAddress is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    matrNr: {
        type: Number,
        required: [
            function() { return this.role === 'student'; },
            'matrNr is required if users role is "student"'
        ],
        min: [100000,'matrNr must be between 100000 and 999999'],
        max: [999999,'matrNr must be between 100000 and 999999'],
    }
    }, {
    timestamps: {createdAt: 'timestamp'}
});

module.exports = mongoose.model('User', UserSchema);
