class CustomError extends Error {
  constructor (data, option) {
    super()
    this.name = data.type
    this.message = data.err
  }
}
module.exports = CustomError
