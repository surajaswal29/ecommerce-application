const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken()

  res.status(statusCode).json({
    success: true,
    user,
    token,
  })
}

module.exports = sendToken
