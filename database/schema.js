const { Schema, model } = require('mongoose');
const mongoose = require('mongoose'); 
/**
 * User schema
 */
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, 'require field email'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'require field password'],
    },
    name: {
        type: String,
    },
    otp: {
        type: String,
    },
    role: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: false,
    },
    is_active: {
        type: Boolean,
        default: false,
    },
    followers: [
        {type: mongoose.Types.ObjectId, ref: 'User'}
    ]
});
/**
 * User model
 */
const User = mongoose.model('User', userSchema);
/**
 * Chat group schema
 */
const groupSchema = new Schema({});
/**
 * Group model
 */
const Group = model('Group', groupSchema);
/**
 * UserGroup schema
 */
const userGroupSchema = new Schema({});
/**
 * UserGroup model
 */
const UserGroup = model('UserGroup', userGroupSchema);
/**
 * Message schema
 */
const messageSchema = new Schema({});
/**
 * Message model
 */
const Message = model('Message', messageSchema);

module.exports = { User, Group, UserGroup, Message };
