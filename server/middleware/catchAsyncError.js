module.exports = (callback) => (req, res, next) => {
  Promise.resolve(callback(req, res, next)).catch(next)
}
