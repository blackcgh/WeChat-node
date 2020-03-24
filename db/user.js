const mongoose = require('./mongodb')

const UserSchema = new mongoose.Schema({
  username: String, // 用户名
  password: String, // 密码
  avatar: String,   // 头像
  friend: Array,    // 朋友队列
  request: Array   // 请求添加朋友的队列
})

module.exports = mongoose.model('User', UserSchema, 'user')
