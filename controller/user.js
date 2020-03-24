const UserModel = require('../db/user')

// 登录
function login(username, password) {
  return UserModel.aggregate([
    {
      $match: { username, password }
    },
    {
      $project: {
        username: 1,
        avatar: 1,
        friend: 1,
        request: 1,
        ['_id']: 0
      }
    }
  ])
}

// 注册
function register(username, password) {
  return UserModel.findOne({ username }).then(result => {
    if(!result) {
      return UserModel.create({ username, password })
    }
    return null
  })
}

// 退出登录
function signOut() {}

// 搜索用户
function search(keyword) {
  const reg = new RegExp(keyword, 'i');
  return UserModel.aggregate([
    {
      $match: { username: { $regex: reg } }
    },
    {
      $project: {
        username: 1,
        avatar: 1
      }
    }
  ])
}

// 添加朋友
function add(obj, receiveOne) {
  return UserModel.updateOne({ username: receiveOne }, {
    $addToSet: { request: obj }
  })
}

// 同意添加
async function agree(agreeOne, requestOne) {
  await UserModel.updateOne({ username: requestOne }, {
    $push: { friend: agreeOne }
  })
  await UserModel.updateOne({ username: agreeOne }, {
    $push: { friend: requestOne },
    $pull: { request: { sendOne: requestOne } }
  })
}

module.exports = {
  login,
  register,
  signOut,
  search,
  add,
  agree
}
