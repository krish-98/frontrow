const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const app = express()

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.bpfpqhj.mongodb.net/frontrow-booking?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Database connected and the server is running on ${process.env.PORT}`
      )
    })
  })
  .catch((error) => console.error(error))

app.get("/", (req, res) => {
  res.json({
    message: "Hola from Server!",
  })
})
