const mongoose = require('mongoose')
const { MONGODB_CONF } = require('../conf/db')

mongoose.connect(MONGODB_CONF, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

module.exports = mongoose
