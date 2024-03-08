require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("../config/logger");

let server = null;

const start = async (api, repository) => {
  const app = express();

  app.use(helmet());
  app.use(morgan("dev"));

  api(app, repository);

  app.get("/teste", (req, res, next) => {
    res.send(
      `Serviço ${process.env.SERVICE_NAME} rodando na porta ${process.env.PORT}`
    );
  });

  app.use((error, req, res, next) => {
    logger.error(`${error.stack}`);
    res.status(500).send("Erro interno no servidor");
  });

  server = app.listen(process.env.PORT, () => {
    console.log(
      `Serviço ${process.env.SERVICE_NAME} subiu na porta ${process.env.PORT}`
    );
  });

  return server;
};

const stop = async () => {
  if (server) await server.close();
  return true;
};

module.exports = { start, stop };
