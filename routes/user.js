const express = require('express');
const {
  login,
  register,
  signOut,
  search,
  add,
  agree
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
    // 生成token
    const token = jwt.sign({
      username: userData[0].username,
      id: userData[0]['_id']
    }, 'black_token', { expiresIn: '24h' });

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
  const { username, password } = req.body;
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
  const { obj, receiveOne } = req.body;
  await add(obj, receiveOne);
  res.json(new SuccessModel('已发送'))
})

// $route POST /api/user/agree
// @desc  同意添加
router.post('/agree', async (req, res, next) => {
  const { agreeOne, requestOne } = req.body;
  await agree(agreeOne, requestOne);
  res.json(new SuccessModel('添加成功'))
})

module.exports = router;
