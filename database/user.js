const { User } = require('./schema');

/**
 * tao mot user trong db
 *
 * @async
 * @function createUser
 * @param {object} user - User object
 *
 */
exports.createUser = async function (user) {};

/**
 * cap nhat thay doi thong tin cua mot user
 *
 * @async
 * @function updateUser
 * @param {object} byField - dieu kien de update
 * @param {object} update - thong tin thay doi
 */
exports.updateUser = async function (byField, update = null) {};

/**
 * dat trang thai mot user ve locked
 *
 * @async
 * @function deleteUser
 * @param {string} id
 */
exports.deleteUser = async function (id) {};

/**
 * kich hoat mot tai khoan moi dang ky, hoac kich hoat lai mot tai khoan bi khoa
 *
 * @async
 * @function activeUser
 * @param {string} email
 * @param {string} otp -  a string consist 6 number.
 */
exports.activeUser = async function (email, otp) {};

/**
 * lay thong tin mot user theo thuoc tinh
 *
 * @async
 * @function getUser
 * @param {object} byField
 * @param {number} limit - phan trang ket qua, mac dinh lay het du lieu
 */
exports.getUser = async function (byField, limit = 0) {};

/**
 * lay danh sach follower
 *
 * @async
 * @function getFollowers
 * @param {string} id - objectId
 */
exports.getFollowers = async function (id) {};
