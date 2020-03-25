const express = require('express')
const { getList, newChat } = require('../controller/chat')
const { SuccessModel } = require('../model/resultModel')

const router = express.Router();

// $route GET api/chat/list
// @desc  获取聊天记录
router.get('/list', async (req, res, next) => {
  const { sendOne, receiveOne } = req.query;
  const result = await getList(sendOne, receiveOne);
  res.json(new SuccessModel(result))

})

// $route POST api/chat/new
// @desc  新增一条聊天记录
router.post('/new', async (req, res ,next) => {
  await newChat(req.body);
  res.json(new SuccessModel('发送成功'))

})

module.exports = router
