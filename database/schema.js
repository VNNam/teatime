const { Schema, model } = require('mongoose');

const VALID_EMAIL_REGEX = new RegExp(
  // ref: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@" +
    '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
    '(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$'
);

/**
 * User schema
 */
const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    validate: {
      validator: (email) => VALID_EMAIL_REGEX.test(email),
      message: (props) => `${props.value} is not an valid email`,
    },
    required: true,
  },
  otp: { type: Schema.Types.String },
  hashedPwd: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
  online: { type: Boolean, default: false },
  isActivated: { type: Boolean, default: false },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});
/**
 * User model
 */
const User = model('User', userSchema);
/**
 * Chat group schema
 */
const groupSchema = new Schema({
  name: { type: String, required: true },
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Schema.Types.Date, required: true, default: new Date() },
  closedAt: { type: Schema.Types.Date },
});
/**
 * Group model
 */
const Group = model('Group', groupSchema);
/**
 * UserGroup schema
 */
const userGroupSchema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  joinedAt: { type: Schema.Types.Date, default: new Date() },
});
/**
 * UserGroup model
 */
const UserGroup = model('UserGroup', userGroupSchema);
/**
 * Message schema
 */
const messageSchema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  messageContent: { type: String, required: true },
  createdAt: { type: Schema.Types.Date, default: new Date(), required: true },
  link: { type: Schema.Types.String },
  pinned: { type: Schema.Types.Boolean, default: false },
  hided: { type: Schema.Types.Boolean, default: false },
});
/**
 * Message model
 */
const Message = model('Message', messageSchema);

module.exports = { User, Group, UserGroup, Message };
