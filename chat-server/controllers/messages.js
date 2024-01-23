const Message = require('../models/message');

const getChat = async (req, res) => {

  const uid = req.uid;
  const messagesFrom = req.params.from;

  const last30 = await Message.find({
    $or: [
      { from: uid, to: messagesFrom },
      { from: messagesFrom, to: uid }
    ]
  })
  .sort({ createdAt: 'desc' })
  .limit(30);

  res.json({
    ok: true,
    messages: last30
  })

}




module.exports = {
  getChat,
}