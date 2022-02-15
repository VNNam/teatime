const { messages } = require('../database');

exports.getGroupMessage = async (req, res, next) => {
  try {
    const groupId = req.params.gId;
    const resp = await messages.getMessages(groupId);
    res.json({ ...resp });
  } catch (error) {
    res.json(error);
  }
};

exports.createMessage = async (req, res, next) => {
  try {
    const { userId, gId } = req.params;
    const msg = req.body.message;
    const resp = await messages.createMessage(gId, userId, msg);
    res.json({ ...resp });
  } catch (error) {
    res.json(error);
  }
};
