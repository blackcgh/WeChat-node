const mongoose = require('./mongodb')

const ChatSchema = new mongoose.Schema({
  content: String,    // 聊天内容
  createTime: Date,   // 创建时间
  sendOne: String,    // 发送人
  receiveOne: String, // 接收人
})

module.exports = mongoose.model('Chat', ChatSchema, 'chat')
