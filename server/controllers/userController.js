const User = require("../models/User")
const bcrypt = require("bcrypt")

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

  const saltRounds = 10
  const hashedPassword = bcrypt.hashSync(password, saltRounds)

  let user
  try {
    user = new User({ name, email, password: hashedPassword })
    user = await user.save()
  } catch (error) {
    return console.error(error)
  }

  if (!user) {
    return res.status(500).json({ message: "Unexcepted error occured!" })
  }
  return res.status(201).json({ user })
}

const updateUser = async (req, res, next) => {
  const { id } = req.params
  const { name, email, password } = req.body
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" })
  }

  const saltRounds = 10
  const hashedPassword = bcrypt.hashSync(password, saltRounds)

  let user
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    })
  } catch (error) {
    return console.error(error)
  }

  if (!user) {
    return res.status(500).json({ message: "Something went wrong" })
  }
  return res.json({ message: "Updated successfulyy" })
}

const deleteUser = async (req, res, next) => {
  const { id } = req.params

  let user
  try {
    user = await User.findByIdAndDelete(id)
  } catch (error) {
    console.error(error)
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" })
  }

  return res.json({ message: "Deleted Successfully" })
}

module.exports = { getAllUsers, signup, updateUser, deleteUser }
