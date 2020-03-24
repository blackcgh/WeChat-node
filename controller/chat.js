const ChatModel = require('../db/chat')

// 获取聊天列表
function getList(me, other) {
  const obj = {
    $or: [
      {
        sendOne: me,
        receiveOne: other
      },
      {
        sendOne: other,
        receiveOne: me
      }
    ]
  }
  return ChatModel.find(obj)
}

// 新增一条聊天记录
function newChat(chat) {
  return ChatModel.create(chat)
}

module.exports = {
  getList,
  newChat
}
