const { ObjectId } = require("mongodb");
const database = require("../config/database");

const getAllCities = async () => {
  const db = await database.connect();
  return db
    .collection("cinemaCatalog")
    .find({})
    .project({ cidade: 1, uf: 1, pais: 1 })
    .toArray();
};

const getCinemasByCityId = async (cityId) => {
  const objCityId = new ObjectId(cityId);

  const db = await database.connect();
  const city = await db
    .collection("cinemaCatalog")
    .findOne({ _id: objCityId }, { projection: { cinemas: 1 } });

  return city.cinemas;
};

const getMoviesByCinemaId = async (cinemaId) => {
  const objCinemaId = new ObjectId(cinemaId);
  const db = await database.connect();
  const group = await db
    .collection("cinemaCatalog")
    .aggregate([
      { $unwind: "$cinemas" },
      { $match: { "cinemas.cinemaId": objCinemaId } },
      { $unwind: "$cinemas.salas" },
      { $unwind: "$cinemas.salas.sessoes" },
      {
        $group: {
          _id: {
            _id: "$cinemas.salas.sessoes.filmeId",
            titulo: "$cinemas.salas.sessoes.filme",
          },
        },
      },
    ])
    .toArray();
  return group.map((film) => film._id);
};

const getMoviesByCityId = async (cityId) => {
  const objCityId = new ObjectId(cityId);
  const db = await database.connect();
  const group = await db
    .collection("cinemaCatalog")
    .aggregate([
      { $match: { _id: objCityId } },
      { $unwind: "$cinemas" },
      { $unwind: "$cinemas.salas" },
      { $unwind: "$cinemas.salas.sessoes" },
      {
        $group: {
          _id: {
            _id: "$cinemas.salas.sessoes.filmeId",
            titulo: "$cinemas.salas.sessoes.filme",
          },
        },
      },
    ])
    .toArray();
  return group.map((film) => film._id);
};

const getMovieSessionsByCityId = async (movieId, cityId) => {
  const objMovieId = new ObjectId(movieId);
  const objCityId = new ObjectId(cityId);
  const db = await database.connect();
  const group = await db
    .collection("cinemaCatalog")
    .aggregate([
      { $match: { _id: objCityId } },
      { $unwind: "$cinemas" },
      { $unwind: "$cinemas.salas" },
      { $unwind: "$cinemas.salas.sessoes" },
      { $match: { "cinemas.salas.sessoes.filmeId": objMovieId } },
      {
        $group: {
          _id: {
            cinemaId: "$cinemas.cinemaId",
            cinema: "$cinemas.nome",
            sala: "$cinemas.salas.nome",
            sessao: "$cinemas.salas.sessoes",
          },
        },
      },
    ])
    .toArray();
  return group.map((sessions) => sessions._id);
};

const getMovieSessionsByCinemaId = async (movieId, cinemaId) => {
  const objMovieId = new ObjectId(movieId);
  const objCinemaId = new ObjectId(cinemaId);
  const db = await database.connect();
  const group = await db
    .collection("cinemaCatalog")
    .aggregate([
      { $unwind: "$cinemas" },
      { $match: { "cinemas.cinemaId": objCinemaId } },
      { $unwind: "$cinemas.salas" },
      { $unwind: "$cinemas.salas.sessoes" },
      { $match: { "cinemas.salas.sessoes.filmeId": objMovieId } },
      {
        $group: {
          _id: {
            cinemaId: "$cinemas.cinemaId",
            cinema: "$cinemas.nome",
            sala: "$cinemas.salas.nome",
            sessao: "$cinemas.salas.sessoes",
          },
        },
      },
    ])
    .toArray();
  return group.map((sessions) => sessions._id);
};

module.exports = {
  getAllCities,
  getCinemasByCityId,
  getMoviesByCinemaId,
  getMoviesByCityId,
  getMovieSessionsByCityId,
  getMovieSessionsByCinemaId,
};
