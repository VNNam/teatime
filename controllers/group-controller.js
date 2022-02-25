const { groups } = require('../database');
// Schemas
const { Group, User, Message, UserGroup } = require('../database');

exports.groupsOfUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { userGroups, error } = await groups.getGroupsOfUser(userId);
    if (error) throw error;
    res.json(userGroups);
  } catch (error) {
    return res.json(error);
  }
};
exports.createGroup = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { name } = req.body;
    console.log(userId, name);
    const createResp = await groups.createGroup(userId, name);
    const addResp = await groups.addMember(createResp.group._id, userId);
    if (createResp.error) throw createResp.error;
    if (addResp.error) throw addResp.error;
    res.json(addResp.group);
  } catch (error) {
    res.json(error);
  }
};
exports.addMember = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    const { group, error } = await groups.addMember(groupId, userId);
    res.json({ group, error });
  } catch (error) {
    next(error);
  }
};
exports.members = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { members, error } = await groups.getMembers(groupId);
    res.json({ members, error });
  } catch (error) {
    res.json(error);
  }
};
exports.getGroup = async (data, req, res, next) => {
  try {
    const { username, id: userId, notLoggedIn } = await data;
    if (notLoggedIn) return res.redirect('users/login');
    const { id: groupId } = req.params;
    const userGroup = await UserGroup.find({ user: userId, group: groupId });
    if (!userGroup) throw new Error('No permission');
    const group = await Group.findById(groupId);
    if (!group) throw new Error('Not found group');
    const userGroupsOfUser = await UserGroup.find({ user: userId }).populate(
      'group'
    );
    if (!userGroupsOfUser.length) throw new Error('User has no groups');

    const messages = await Message.find({ group: groupId })
      .populate('user')
      .sort({
        createdAt: 1,
      });
    const followedUserOfGroup = await UserGroup.find({
      group: groupId,
    }).populate('user');

    res.render('group', {
      user: { id: userId, username },
      group,
      groups: userGroupsOfUser, // TODO: need change key name,
      followedUserOfGroup: followedUserOfGroup,
      messages,
    });
  } catch (error) {
    next(error);
  }
};
