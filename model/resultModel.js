class ResultModel {
  constructor(data, msg) {
    if(typeof data === 'string') {
      this.msg = data;
      return
    }
    if(data) {
      this.data = data
    }
    if(msg) {
      this.msg = msg
    }
  }
}

// 成功的响应
class SuccessModel extends ResultModel {
  constructor(data, msg) {
    super(data, msg);
    // 0表示成功
    this.errno = 0
  }
}

// 失败的响应
class ErrorModel extends ResultModel {
  constructor(data, msg) {
    super(data, msg);
    // -1表示失败
    this.errno = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
