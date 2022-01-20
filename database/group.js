const { Group, UserGroup } = require('./schema');

/**
 * ham tao mot group tren db
 *
 * @async
 * @param {string} userId
 * @param {string} name
 * @returns group
 */
async function createGroup(userId, name) {
  try {
    const group = await Group.create({
      name,
      admin: userId,
    }).exec();
    return { group };
  } catch (error) {
    return { error };
  }
}
/**
 * ham update mot group
 *
 * @async
 * @param {string} groupId
 * @param {string} update
 * @returns updatedGroup | error
 */
async function updateGroup(groupId, update = {}) {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(groupId, {
      ...update,
    }).exec();
    return { updatedGroup };
  } catch (error) {
    return { error };
  }
}

/**
 * ham them mot thanh vien vao group
 *
 * @async
 * @param {string} groupId
 * @param {string} userId
 * @returns group{groupId, userId } | error
 */
async function addMember(groupId, userId) {
  try {
    const group = await UserGroup.create({
      group: groupId,
      user: userId,
    });
    return { group };
  } catch (error) {
    return { error };
  }
}

/**
 * ham xoa mot thanh vien trong group
 *
 * @async
 * @param {string} groupId
 * @param {string} userId
 * @returns removedUser | error
 */
async function removeMember(groupId, userId) {
  try {
    const removedUser = await UserGroup.findOneAndDelete({
      group: groupId,
      user: userId,
    }).exec();
    return { removedUser };
  } catch (error) {
    return { error };
  }
}

/**
 * ham lay tat ca thanh vien cua mot nhom
 *
 * @async
 * @param {string} groupId
 * @returns members - mot mang thanh vien trong group
 */
async function getMembers(groupId) {
  try {
    const members = await UserGroup.find({ group: groupId })
      .populate('user', '_id fullName email')
      .exec();
    return { members };
  } catch (error) {
    return { error };
  }
}

/**
 * ham dong mot group
 *
 * @param {string} groupId
 * @returns updatedGroup |error
 */
async function closeGroup(groupId) {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(groupId, {
      closedAt: new Date(),
    }).exec();
    return { updatedGroup };
  } catch (error) {
    return { error };
  }
}
/**
 * ham lay thong tin admin cua mot group
 *
 * @async
 * @param {string} groupId
 * @returns user hoac error
 */
async function getGroupAdmin(groupId) {
  try {
    const groupAdmin = await Group.findById(groupId, 'admin')
      .populate('admin', '-hashedPwd')
      .exec();
    return { groupAdmin };
  } catch (error) {
    return { error };
  }
}

/**
 * ham thay doi quyen admin cua nhom
 *
 * @param {string} groupId
 * @param {string} userId
 * @returns newAdmin - thong tin user la admin moi cua group
 */
async function setGroupAdmin(groupId, userId) {
  try {
    const newAdmin = await Group.findByIdAndUpdate(
      groupId,
      { admin: userId },
      'admin'
    )
      .populate('admin')
      .exec();
    return { newAdmin };
  } catch (error) {
    return { error };
  }
}

/**
 * ham roi khoi nhom, neu la admin thi set admin moi,
 * sau do moi xoa
 *
 * @async
 * @param {string} groupId
 * @param {string} userId
 * @returns leftUser - thong tin user roi khoi nhom
 */
async function leaveGroup(groupId, userId) {
  try {
    const { admin } = await Group.findById(groupId, 'admin').exec();
    if (admin == userId) {
      const { user } = await UserGroup.findOne({
        group: groupId,
        user: { $nin: [userId] },
      }).exec();
      const { error } = await setGroupAdmin(groupId, user);
      if (error) throw new Error(error.message);
    }
    const leftUser = await UserGroup.findOneAndDelete(
      {
        group: groupId,
        user: userId,
      },
      'user'
    )
      .populate('user')
      .exec();

    return { leftUser };
  } catch (error) {
    return { error };
  }
}
