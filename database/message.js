const { Message } = require('./schema');
/**
 * ham lay danh sach tin nhan trong 1 nhom
 *
 * @param {string} groupId
 * @param {number} limit, @default 100
 * @param {number} skip ,@default 0
 * @returns messages | error
 */
async function getMessages(groupId, limit = 5, skip = 0) {
  try {
    const messages = await Message.find({
      group: groupId,
      hided: false,
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('user', 'fullName')
      .exec();
    return { messages };
  } catch (error) {
    return { error };
  }
}

/**
 * ham tao 1 tin nhan cua 1 user trong 1 group
 *
 * @param {string} groupId
 * @param {string} userId
 * @param {string} messageContent
 * @param {string} link
 * @param {boolean} pinned @default false
 * @returns message | error
 */
async function createMessage(
  groupId,
  userId,
  messageContent,
  link = null,
  pinned = false
) {
  try {
    const message = await Message.create({
      group: groupId,
      user: userId,
      messageContent,
      link,
      pinned,
      createdAt: new Date(),
    });
    return { message };
  } catch (error) {
    return { error };
  }
}

/**
 * ham an 1 message cua 1 user
 *
 * @async
 * @param {string} msgId
 * @returns hidedMessage | error
 */
async function hideMessage(msgId) {
  try {
    const hidedMessage = await Message.findByIdAndUpdate(msgId, {
      hided: true,
    }).exec();
    return { hidedMessage };
  } catch (error) {
    return { error };
  }
}
async function searchMessage() {}

module.exports = { getMessages, createMessage, hideMessage };
