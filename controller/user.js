const UserModel = require('../db/user')

// 登录
function login(username, password) {
  return UserModel.aggregate([{
      $match: {
        username,
        password
      }
    },
    {
      $project: {
        username: 1,
        avatar: 1,
        friend: 1,
        request: 1
      }
    }
  ])
}

// 注册
function register(username, password) {
  return UserModel.findOne({
    username
  }).then(result => {
    if (!result) {
      const obj = {
        username,
        password,
        avatar: 'http://localhost/images/avatar.png' // 默认头像
      }
      return UserModel.create(obj)
    }
    return null
  })
}

// 退出登录
function signOut() {}

// 搜索用户
function search(keyword) {
  const reg = new RegExp(keyword, 'i');
  return UserModel.aggregate([{
      $match: {
        username: {
          $regex: reg
        }
      }
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
  return UserModel.updateOne({
    username: receiveOne
  }, {
    $addToSet: {
      request: obj
    }
  })
}

// 同意添加
async function agree(agreeObj, requestObj) {
  await UserModel.updateOne({
    username: requestObj.friend
  }, {
    $push: {
      friend: agreeObj
    }
  })
  await UserModel.updateOne({
    username: agreeObj.friend
  }, {
    $push: {
      friend: requestObj
    },
    $pull: {
      request: {
        sendOne: requestObj.friend
      }
    }
  })
}

// 上传头像
function upload(id, avatar) {
  return UserModel.updateOne({ '_id': id }, { avatar })
}

// 获取最新头像
function getAvatar(arr) {
  return UserModel.aggregate([
    {
      $match: {
        $or: arr
      }
    },
    {
      $project: {
        username: 1,
        avatar: 1
      }
    }
  ])
}

module.exports = {
  login,
  register,
  signOut,
  search,
  add,
  agree,
  upload,
  getAvatar
}
