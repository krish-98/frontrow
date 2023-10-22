const bcrypt = require("bcrypt")
const Admin = require("../models/Admin")

const addAdmin = async (req, res, next) => {
  const { email, password } = req.body

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
  return res.json({ admin })
}

module.exports = { addAdmin }
