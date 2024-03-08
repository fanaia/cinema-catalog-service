const { test, expect } = require("@jest/globals");
const database = require("./database");

test("connect", async () => {
  const connection = await database.connect();
  expect(connection).toBeTruthy();
});

test("disconnect", async () => {
  const isDisconect = await database.disconnect();
  expect(isDisconect).toBeTruthy();
});

test("disconnect - já desconectado", async () => {
  const isDisconect = await database.disconnect();
  expect(isDisconect).toBeTruthy();
});
