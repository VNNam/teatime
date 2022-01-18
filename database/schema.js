const { Schema, model } = require('mongoose');

/**
 * User schema
 */
const userSchema = new Schema({});
/**
 * User model
 */
const User = model('User', userSchema);
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
