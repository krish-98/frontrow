const User = require("../models/User")

const getAllUsers = async (req, res, next) => {
  let users
  try {
    users = await User.find()
  } catch (error) {
    return console.error(error)
  }

  if (!users) {
    return res.status(500).json({ message: "Unexcepted error occured!" })
  }

  return res.json({ users })
}

const signup = async (req, res, next) => {
  const { name, email, password } = req.body

  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({
      message: "Invalid Inputs",
    })
  }

  let user
  try {
    user = new User({ name, email, password })
    user = await user.save()
  } catch (error) {
    return console.error(error)
  }

  if (!user) {
    return res.status(500).json({ message: "Unexcepted error occured!" })
  }
  return res.status(201).json({ user })
}

module.exports = { getAllUsers, signup }
