const ChatModel = require('../db/chat')

// 获取聊天列表
function getList(sendOne, receiveOne) {
  const obj = {
    $or: [
      {
        sendOne: sendOne,
        receiveOne: receiveOne
      },
      {
        sendOne: receiveOne,
        receiveOne: sendOne
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
