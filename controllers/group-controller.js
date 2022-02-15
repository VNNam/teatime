const { groups } = require('../database');

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
