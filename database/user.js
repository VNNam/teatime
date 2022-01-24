const { User, UserGroup } = require('./schema');
const bcrypt = require('bcrypt');
const { SALT_ROUND, JWT_SECRET, OTP_EXPIRESIN, JWT_KEY } = require('../config');
const jwt = require('jsonwebtoken');
const { Types } = require('mongoose');

/**
 * ham kiem tra email da co trong db hay chua
 *
 * @async
 * @param {String} email
 * @returns {boolean}
 */
async function hasEmail(email) {
  try {
    const user = await User.findOne({ email }).select('_id').exec();
    return user ? true : false;
  } catch (error) {
    return { error };
  }
}

/**
 * ham tao mot user trong db
 *
 * @async
 * @function createUser
 * @param {String} email
 * @param {String} fullName
 * @param {String} password -plaintext password
 * @returns user neu thanh cong, error neu that bai
 */
exports.createUser = async function (email, fullName, password) {
  try {
    if (await hasEmail(email)) throw new Error('email has registerd');
    const hashedPwd = await bcrypt.hash(password, parseInt(SALT_ROUND));
    const user = await User.create({ email, fullName, hashedPwd });
    return { user };
  } catch (error) {
    return { error };
  }
};

/**
 * cap nhat thay doi thong tin cua mot user
 *
 * @async
 * @function updateUser
 * @param {object} byField - dieu kien de update
 * @param {object} update - thong tin thay doi
 * @returns updatedUser neu thanh cong, error neu that bai
 */
exports.updateUser = async function (byField, update = {}) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { ...byField },
      {
        $set: {
          ...update,
        },
      }
    )
      .select('-hashedPwd')
      .exec();
    return { updatedUser };
  } catch (error) {
    return { error };
  }
};

/**
 * dat thuoc tinh cua user: isActivated = false
 *
 * @async
 * @function deleteUser
 * @param {string} id
 * @returns lockedUser neu thanh cong, error neu that bai
 */
exports.deleteUser = async function (id) {
  try {
    const lockedUser = await User.findByIdAndUpdate(id, {
      $set: {
        isActivated: false,
      },
    })
      .select('-hashedPwd')
      .exec();
    return { lockedUser };
  } catch (error) {
    return { error };
  }
};

/**
 * kich hoat mot tai khoan moi dang ky, hoac kich hoat lai mot tai khoan bi khoa
 *
 * @async
 * @function activeUser
 * @param {string} email
 * @param {string} otp -  a string consist 6 number.
 * @returns user._id neu thanh cong, error neu that bai
 */
exports.activeUser = async function (email, otp) {
  try {
    if (!(await hasEmail(email))) throw new Error('email is not registered');
    const user = await User.findOne({ email }, '_id otp').exec();
    const decoded = jwt.verify(user.otp, JWT_SECRET);
    if (decoded.otp === otp) {
      const activatedUser = await User.findByIdAndUpdate(user._id, {
        $set: {
          isActivated: true,
          otp: null,
        },
      })
        .select('_id')
        .exec();
      return { activatedUser };
    } else throw new Error('otp miss match!');
  } catch (error) {
    return { error };
  }
};

/**
 * lay thong tin mot user theo thuoc tinh
 *
 * @async
 * @function getUser
 * @param {object} byField
 * @param {number} limit - phan trang ket qua, mac dinh lay het du lieu
 */
exports.getUser = async function (byField, limit = 0) {
  try {
    const users = await User.find({ ...byField })
      .limit(limit)
      .select('-hashedPwd')
      .exec();
    return { users };
  } catch (error) {
    return { error };
  }
};

/**
 * ham lay thong tin followers
 *
 * @async
 * @param {string} id
 * @returns user {_id, followers:[{fullName}]}
 */
exports.getFollowers = async function (id) {
  try {
    const user = await User.findById(id)
      .select('_id followers')
      .populate('followers', 'fullName')
      .exec();
    return { user };
  } catch (error) {
    return { error };
  }
};

/**
 * ham luu otp xuong db
 *
 * @async
 * @param {string} id
 * @param {string} otp - 6 digits
 * @returns
 */
exports.setOTP = async function (id, otp) {
  try {
    const encoded = jwt.sign({ otp }, JWT_SECRET, { expiresIn: OTP_EXPIRESIN });
    const updatedUser = await User.findByIdAndUpdate(id, {
      $set: {
        otp: encoded,
      },
    }).exec();
    return { updatedUser };
  } catch (error) {
    return { error };
  }
};

/**
 * ham lay thong tin 1 user
 *
 * @async
 * @param {object} byField
 * @returns user {_id, followers:[{fullName}]}
 */
exports.getOneUser = async function (byField) {
  try {
    const user = await User.findOne({ ...byField })
      .populate('followers', 'fullName')
      .exec();
    return user;
  } catch (error) {
    return { error };
  }
};

/**
 * ham lay tao token luu thong tin user
 *
 * @async
 * @param {object} user
 * @returns token
 */
exports.createToken = async function (user) {

  const token = await jwt.sign(
    {
        userData: {
            _id: user._id,
            username: user.email,
            timestamp: new Date()
        },
        exp: 60 * 60 * 60 * 60 * 1000,
    },
    JWT_KEY
  )
  return token;
}

/**
 * ham lay kiem tra email, password khi login
 *
 * @async
 * @param {string} email
 * @param {string} password
 * @returns token hoac error
 */
exports.authenticate = async function (email, password) {
  try {
    const user = await User.findOne({ email});
    if(!user) throw new Error(`Email does not exist`);
    const checkPassword = await bcrypt.compare(password, user.hashedPwd)
    if(!checkPassword) throw new Error(`incorrect password`);
    const token = await this.createToken(user);
    return { token }
  } catch (error) {
    return { error };
  }
}