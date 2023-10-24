const express = require("express")
const movieRouter = express.Router()
const movieController = require("../controllers/movieController")

movieRouter.get("/", movieController.getAllMovies)
movieRouter.post("/", movieController.addMovie)

module.exports = movieRouter
