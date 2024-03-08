const { test, expect, beforeAll, afterAll } = require("@jest/globals");
const request = require("supertest");

const server = require("../server/server");
const cinemaCatalog = require("./cinemaCatalog");
const repositoryMock = require("../repository/__mocks__/repository");

let app;

beforeAll(async () => {
  app = await server.start(cinemaCatalog, repositoryMock);
});

afterAll(async () => {
  await server.stop();
});

test("GET /cities 200", async () => {
  const res = await request(app).get("/cities/");
  expect(res.status).toEqual(200);
  expect(Array.isArray(res.body)).toBeTruthy();
  expect(Array.length).toBeTruthy();
});

test("GET /cities/:cityId/movies 200", async () => {
  const res = await request(app).get("/cities/1/movies");
  expect(res.status).toEqual(200);
  expect(Array.isArray(res.body)).toBeTruthy();
  expect(Array.length).toBeTruthy();
});

test("GET /cities/:cityId/movies 404", async () => {
  const res = await request(app).get("/cities/-1/movies");
  expect(res.status).toEqual(404);
});

test("GET /cities/:cityId/movies/:movieId 200", async () => {
  const res = await request(app).get("/cities/1/movies/4");
  expect(res.status).toEqual(200);
  expect(Array.isArray(res.body)).toBeTruthy();
  expect(Array.length).toBeTruthy();
});

test("GET /cities/:cityId/movies/:movieId 404", async () => {
  const res = await request(app).get("/cities/-1/movies/4");
  expect(res.status).toEqual(404);
});

test("GET /cities/:cityId/cinemas 200", async () => {
  const res = await request(app).get("/cities/1/cinemas");
  expect(res.status).toEqual(200);
  expect(Array.isArray(res.body)).toBeTruthy();
  expect(Array.length).toBeTruthy();
});

test("GET /cities/:cityId/cinemas 404", async () => {
  const res = await request(app).get("/cities/-1/cinemas");
  expect(res.status).toEqual(404);
});

test("GET /cinemas/:cinemaId/movies 200", async () => {
  const res = await request(app).get("/cinemas/1/movies");
  expect(res.status).toEqual(200);
  expect(Array.isArray(res.body)).toBeTruthy();
  expect(Array.length).toBeTruthy();
});

test("GET /cinemas/:cinemaId/movies 404", async () => {
  const res = await request(app).get("/cinemas/-1/movies");
  expect(res.status).toEqual(404);
});

test("GET /cinemas/:cinemaId/movies/:movieId 200", async () => {
  const res = await request(app).get("/cinemas/1/movies/1");
  expect(res.status).toEqual(200);
  expect(Array.isArray(res.body)).toBeTruthy();
  expect(Array.length).toBeTruthy();
});

test("GET /cinemas/:cinemaId/movies/:movieId 404", async () => {
  const res = await request(app).get("/cinemas/-1/movies/1");
  expect(res.status).toEqual(404);
});