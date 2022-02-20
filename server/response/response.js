module.exports = class Response {
  constructor({
    // data: data to be send
    code,
    // status code:
    // 0: success
    // 1: failed, logic error
    // 2: failed, login token expire
    // 3: failed, token not valid
    data,
    //message to be send
    message
  }) {
    this.code = code
    this.data = data
    this.message = message
  }
}