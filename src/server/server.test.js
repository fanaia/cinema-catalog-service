const { test, expect, beforeAll, afterAll } = require("@jest/globals");
const request = require("supertest");
const server = require("./server");

let app;

const apiMock = jest.fn((app, repository) => {
  app.get("/error", (req, res, next) => {
    throw new Error("Mock Error");
  });
});

test("start", async () => {
  app = await server.start(apiMock);
  expect(app).toBeTruthy();
});

test("GET /teste", async () => {
  const res = await request(app).get("/teste");
  expect(res.status).toEqual(200);
});

test("GET /error", async () => {
  const res = await request(app).get("/error");
  expect(res.status).toEqual(500);
});

test("stop", async () => {
  const isStopped = await server.stop();
  expect(isStopped).toBeTruthy();
});
