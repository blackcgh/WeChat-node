const express = require('express');
const formidable = require('formidable')
const fs = require('fs')
const {
  login,
  register,
  signOut,
  search,
  add,
  agree,
  upload,
  getAvatar
} = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resultModel')

const jwt = require('jsonwebtoken');

const router = express.Router();

// $route POST api/user/login
// @desc  登录
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const userData = await login(username, password);
  if (userData.length) {
    // 请求队列获取最新头像
    if (userData[0].request.length) {
      const request = userData[0].request.map(el => {
        return { username: el.sendOne }
      })
      const result = await getAvatar(request);
      for (let i of userData[0].request) {
        for (let j of result) {
          if (i.sendOne === j.username) {
            i.avatar = j.avatar;
            break;
          }
        }
      }
    }
    // 朋友队列获取最新头像
    if (userData[0].friend.length) {
      const friend = userData[0].friend.map(el => {
        return { username: el.friend }
      })
      const result2 = await getAvatar(friend);
      userData[0].friend.forEach(el => {
        for (let i of result2) {
          if (el.friend === i.username) {
            el.avatar = i.avatar;
            break;
          }
        }
      })
    }
    // 生成token
    const token = jwt.sign({
      username: userData[0].username,
      id: userData[0]['_id']
    }, 'black_token', {
      expiresIn: '24h'
    });

    // 响应
    res.json(new SuccessModel({
      userData,
      token
    }, '登录成功！'));
    return
  }
  res.json(new ErrorModel('登录失败！'))
})

// $route POST /api/user/register
// @desc  注册
router.post('/register', async (req, res, next) => {
  const {
    username,
    password
  } = req.body;
  const result = await register(username, password);
  if (result) {
    res.json(new SuccessModel({
      username: result.username
    }, '注册成功！'))
    return
  }
  res.json(new ErrorModel('注册失败！'))
})

// $route POST /api/user/signout
// @desc  退出登录
router.post('/signout', async (req, res, next) => {

})

// $route GET /api/user/search
// @desc  搜索用户
router.get('/search', async (req, res, next) => {
  const result = await search(req.query.keyword);
  res.json(new SuccessModel(result))
})

// $route POST /api/user/add
// @desc  添加朋友
router.post('/add', async (req, res, next) => {
  const {
    obj,
    receiveOne
  } = req.body;
  await add(obj, receiveOne);
  res.json(new SuccessModel('已发送'))
})

// $route POST /api/user/agree
// @desc  同意添加
router.post('/agree', async (req, res, next) => {
  const {
    agreeObj,
    requestObj
  } = req.body;
  await agree(agreeObj, requestObj);
  res.json(new SuccessModel('添加成功'))
})

// $route POST /api/user/upload
// @desc  上传头像
router.post('/upload', async (req, res, next) => {
  const form = new formidable.IncomingForm();
  // 更改头像存储路径
  form.uploadDir = './public/images/';
  form.parse(req, (err, fields, files) => {
    const id = Object.keys(files)[0];
    const avatar = 'http://localhost/images/' + files[id].name;
    const path = './public/images/' + files[id].name;
    fs.rename(files[id].path, path, async function (err) {
      if (err) console.log(err);
      await upload(id, avatar);
      res.json(new SuccessModel('上传成功'))
    })
  })
})

module.exports = router;
