const { test, expect, beforeAll, afterAll } = require("@jest/globals");
const repository = require("./repository");
const database = require("../config/database");

const cityId = "65e0b2891b73a32c95f63b22";
const cinemaId = "65e8724ee157393c6bec2193";
const movieId = "65de213e3883c6003a0f3506";

beforeAll(async () => {});

afterAll(async () => {
  database.disconnect();
});

test("getAllCities", async () => {
  const cities = await repository.getAllCities();
  expect(Array.isArray(cities)).toBeTruthy();
  expect(cities.length).toBeTruthy();
});

test("getCinemasByCityId", async () => {
  const cinemas = await repository.getCinemasByCityId(cityId);
  expect(cinemas).toBeTruthy();
  expect(cinemas.length).toBeTruthy();
});

test("getMoviesByCinemaId", async () => {
  const movies = await repository.getMoviesByCinemaId(cinemaId);
  expect(movies).toBeTruthy();
  expect(Array.isArray(movies)).toBeTruthy();
});

test("getMoviesByCityId", async () => {
  const movies = await repository.getMoviesByCityId(cityId);
  expect(movies).toBeTruthy();
  expect(Array.isArray(movies)).toBeTruthy();
});

test("getMovieSessionsByCityId", async () => {
  const sessions = await repository.getMovieSessionsByCityId(movieId, cityId);
  expect(sessions).toBeTruthy();
  expect(Array.isArray(sessions)).toBeTruthy();
});

test("getMovieSessionsByCinemaId", async () => {
  const sessions = await repository.getMovieSessionsByCinemaId(
    movieId,
    cinemaId
  );
  expect(sessions).toBeTruthy();
  expect(Array.isArray(sessions)).toBeTruthy();
});
