const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRouter = require("./routes/userRouters")
const adminRouter = require("./routes/adminRouters")

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// middlewares
app.use(express.json())
app.use("/user", userRouter)
app.use("/admin", adminRouter)

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.bpfpqhj.mongodb.net/frontrow-booking?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Database connection established and the the server is running on port ${PORT}`
      )
    })
  })
  .catch((error) => console.error(error))

app.get("/", (req, res) => {
  res.json({
    message: "Hola from Server!",
  })
})
