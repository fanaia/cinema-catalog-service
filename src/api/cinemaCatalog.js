const { validateToken } = require("../middlewares/validationMiddleware");

module.exports = (app, repository) => {
  app.get(
    "/cities/:cityId/movies/:movieId",
    validateToken,
    async (req, res, next) => {
      const sessions = await repository.getMovieSessionsByCityId(
        req.params.movieId,
        req.params.cityId
      );
      if (!sessions) return res.status(404).send("Sessions not found");

      res.status(200).json(sessions);
    }
  );

  app.get("/cities/:cityId/movies", validateToken, async (req, res, next) => {
    const movies = await repository.getMoviesByCityId(req.params.cityId);
    if (!movies) return res.status(404).send("Movies not found");

    res.status(200).json(movies);
  });

  app.get("/cities/:cityId/cinemas", validateToken, async (req, res, next) => {
    const cinemas = await repository.getCinemasByCityId(req.params.cityId);
    if (!cinemas) return res.status(404).send("Cinemas not found");

    res.status(200).json(cinemas);
  });

  app.get("/cities", validateToken, async (req, res, next) => {
    const movies = await repository.getAllCities();
    res.status(200).json(movies);
  });

  app.get(
    "/cinemas/:cinemaId/movies/:movieId",
    validateToken,
    async (req, res, next) => {
      const sessions = await repository.getMovieSessionsByCinemaId(
        req.params.movieId,
        req.params.cinemaId
      );
      if (!sessions) return res.status(404).send("Sessions not found");

      res.status(200).json(sessions);
    }
  );

  app.get(
    "/cinemas/:cinemaId/movies",
    validateToken,
    async (req, res, next) => {
      const movies = await repository.getMoviesByCinemaId(req.params.cinemaId);
      if (!movies) return res.status(404).send("Movies not found");

      res.status(200).json(movies);
    }
  );
};
