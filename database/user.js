const { User, UserGroup } = require('./schema');
const bcrypt = require('bcrypt');
const { SALT_ROUND, JWT_SECRET, OTP_EXPIRESIN } = require('../config');
const jwt = require('jsonwebtoken');
const { Types } = require('mongoose');
const { createToken, verifyToken } = require('../utils/token');

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
    console.log(user);
    return user ? true : false;
  } catch (error) {
    console.error(error.message);
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
    if (await hasEmail(email)) throw new Error('email has registered');
    const hashedPwd = await bcrypt.hash(password, parseInt(SALT_ROUND));
    const user = await User.create({ email, fullName, hashedPwd });
    return { user };
  } catch (error) {
    return { error };
  }
};
/**
 * kiem tra otp
 *
 * @param {string} email
 * @param {string} otp
 * @returns boolean | error
 */
exports.verifyOTP = async function (email, otp) {
  try {
    const user = await User.findOne({ email }).select('otp').exec();
    const decoded = jwt.verify(user.otp, JWT_SECRET);
    return decoded.otp === otp;
  } catch (error) {
    return { error };
  }
};
/**
 *
 * @param {string} email
 * @param {string} newPassword
 * @returns updatedUser | error
 */
exports.updatePassword = async function (email, newPassword) {
  try {
    const updatedUser = await User.updateOne(
      { email },
      {
        $set: {
          hashedPwd: await bcrypt.hash(newPassword, parseInt(SALT_ROUND)),
        },
      }
    );
    console.log(updatedUser);
    return { updatedUser };
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
exports.setOTP = async function (fields, otp) {
  try {
    const encoded = jwt.sign({ otp }, JWT_SECRET, { expiresIn: OTP_EXPIRESIN });
    const updatedUser = await User.updateOne(
      { ...fields },
      {
        $set: {
          otp: encoded,
        },
      }
    )
      .select('_id email')
      .exec();
    return { updatedUser };
  } catch (error) {
    return { error };
  }
};

exports.addFollower = async function (userId, followerId) {
  try {
    const { followers } = await User.findById(userId)
      .select('followers')
      .exec();
    if (followers.includes(followerId)) throw new Error('has followed');
    followers.push(followerId);
    const user = await User.updateOne({ _id: userId }, { followers });
    return { user };
  } catch (error) {
    return { error };
  }
};
exports.signIn = async function (email, password) {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) throw new Error('khong ton tai user');
    const chkPwd = await bcrypt.compare(password, user.hashedPwd);
    if (!chkPwd) throw new Error('Pwd khong dung');
    else {
      const token = createToken(
        { username: user.fullName, id: user._id, loginAt: new Date() },
        '2h'
      );
      await User.findByIdAndUpdate(user._id, { online: true });
      return { token };
    }
  } catch (error) {
    return { error };
  }
};

exports.isActivated = async (email) => {
  try {
    const user = await User.findOne({ email }).select('_id isActivated').exec();
    return user.isActivated;
  } catch (error) {
    return { error };
  }
};
exports.searchKey = async function (key) {
  try {
    const users = await User.find({
      email: {
        $regex: key,
      },
    });
    return users;
  } catch (error) {
    return { error };
  }
};
