const User = require("../models/User")

const getAllUsers = async (req, res, next) => {
  let users
  try {
    users = await User.find()
  } catch (error) {
    return next(err)
  }

  if (!users) {
    return res.status(500).json({ message: "Unexcepted error occured!" })
  }

  return res.json({ users })
}

module.exports = { getAllUsers }
