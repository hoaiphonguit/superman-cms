const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    createdAt: {
        type: Number,
        default: new Date().getTime(),
    },
    deleted: {
        type: Number,
        default: 0,
    },
    lastActivity: {
        type: Number,
        default: 0,
    },
    baned: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('users', UserSchema);
