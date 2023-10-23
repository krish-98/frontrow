const bcrypt = require("bcrypt")
const Admin = require("../models/Admin")

const adminSignup = async (req, res, next) => {
  const { email, password } = req.body

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" })
  }

  let existingUser
  try {
    existingUser = await Admin.findOne({ email })
  } catch (error) {
    console.error(error)
  }

  if (existingUser) {
    return res.status(400).json({ message: "Admin already exists" })
  }

  let admin
  const saltRounds = 10
  const hashedPassword = bcrypt.hashSync(password, saltRounds)
  try {
    admin = new Admin({ email, password: hashedPassword })
    admin = await admin.save()
  } catch (error) {
    console.error(error)
  }

  if (!admin) {
    return res.status(500).json({ message: "Unable to store the admin" })
  }
  return res.status(201).json({ admin })
}

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" })
  }

  let existingAdmin
  try {
    existingAdmin = await Admin.findOne({ email })
  } catch (error) {
    console.error(error)
  }
  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" })
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password)
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" })
  }

  return res.json({ message: "Authentication complete" })
}

module.exports = { adminSignup, adminLogin }
