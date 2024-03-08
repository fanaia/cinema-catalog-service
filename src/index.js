const server = require("./server/server");
const cinemaCatalog = require("./api/cinemaCatalog");
const repository = require("./repository/repository");

(async () => {
  try {
    await server.start(cinemaCatalog, repository);
  } catch (error) {
    console.error(error);
  }
})();
