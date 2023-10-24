const jwt = require("jsonwebtoken")
const Movie = require("../models/Movie")

const addMovie = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1]
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token Not Found" })
  }

  /**
   * Verification process
   * 1. verfiy: Decrypt token
   * 2. Store Admin ID From Decrypted Token
   *
   */
  let adminId
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` })
    } else {
      adminId = decrypted.id
      return
    }
  })

  //create new movie
  const { title, description, releaseDate, posterUrl, featured, actors } =
    req.body
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !posterUrl &&
    posterUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" })
  }

  let movie
  try {
    movie = new Movie({
      title,
      description,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      actors,
      posterUrl,
      admin: adminId,
    })
    movie = await movie.save()
  } catch (error) {
    return console.error(error)
  }

  if (!movie) {
    return res.status(500).json({ message: "Request Failed" })
  }

  return res.status(201).json({ movie })
}

const getAllMovies = async (req, res, next) => {
  let movies
  try {
    movies = await Movie.find()
  } catch (err) {
    return console.error(err)
  }

  if (!movies) {
    return res.json(500).json({ message: "Request Failed" })
  }

  return res.json({ movies, getAllMovies })
}

module.exports = {
  addMovie,
  getAllMovies,
}
