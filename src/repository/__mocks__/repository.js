const { ObjectId } = require("mongodb");

const cinemaCatalog = [
  {
    _id: new ObjectId("605e57238ed0562b5da2f87e"),
    cidade: "Porto Alegre",
    uf: "RS",
    pais: "BR",
    cinemas: [
      {
        cinemaId: new ObjectId(),
        nome: "Cinemark Bourbon Ipiranga",
        salas: [
          {
            nome: 1,
            sessoes: [
              {
                data: new Date("2024-02-29T09:00:00.000Z"),
                filmeId: new ObjectId("65de213e3883c6003a0f3507"),
                filme: "Os Vingadores: Guerra Infinita",
                valor: 25,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                ],
              },
              {
                data: new Date("2024-02-29T11:00:00.000Z"),
                filmeId: new ObjectId("65de213e3883c6003a0f3507"),
                filme: "Os Vingadores: Guerra Infinita",
                valor: 25,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
              {
                data: new Date("2021-06-01T13:00:00.000Z"),
                filmeId: new ObjectId("605e57238ed0562b5da2f87e"),
                filme: "Os Vingadores: Era de Ultron",
                valor: 20,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
            ],
          },
          {
            nome: 2,
            sessoes: [
              {
                data: new Date("2024-02-29T09:00:00.000Z"),
                filmeId: new ObjectId("605e57238ed0562b5da2f87e"),
                filme: "Os Vingadores: Era de Ultron",
                valor: 25,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                ],
              },
              {
                data: new Date("2024-02-29T11:00:00.000Z"),
                filmeId: new ObjectId("65de213e3883c6003a0f3506"),
                filme: "Os Vingadores: Ultimato",
                valor: 25,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
              {
                data: new Date("2024-02-29T13:00:00.000Z"),
                filmeId: new ObjectId("65de213e3883c6003a0f3506"),
                filme: "Os Vingadores: Ultimato",
                valor: 20,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        cinemaId: new ObjectId(),
        nome: "GNC Lindóia",
        salas: [
          {
            nome: 100,
            sessoes: [
              {
                data: new Date("2024-02-29T19:00:00.000Z"),
                filmeId: new ObjectId("65de213e3883c6003a0f3506"),
                filme: "Os Vingadores: Ultimato",
                valor: 25,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                ],
              },
              {
                data: new Date("2024-02-29T11:00:00.000Z"),
                filmeId: new ObjectId("65de213e3883c6003a0f3506"),
                filme: "Os Vingadores: Ultimato",
                valor: 25,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
              {
                data: new Date("2024-02-29T13:00:00.000Z"),
                filmeId: new ObjectId("605e57238ed0562b5da2f87e"),
                filme: "Os Vingadores: Era de Ultron",
                valor: 20,
                assentos: [
                  {
                    numero: 1,
                    disponivel: true,
                  },
                  {
                    numero: 2,
                    disponivel: false,
                  },
                  {
                    numero: 2,
                    disponivel: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const getAllCities = () => {
  return cinemaCatalog.map((catalog) => {
    return {
      _id: catalog._id,
      pais: catalog.pais,
      uf: catalog.uf,
      cidade: catalog.cidade,
    };
  });
};

const getCinemasByCityId = (cityId) => {
  if (cityId == -1) return null;

  return cinemaCatalog[0].cinemas;
};

const getMoviesByCinemaId = (cinemaId) => {
  if (cinemaId == -1) return null;

  return getCinemasByCityId().map((cinema) => {
    return {
      _id: cinema.salas[0].sessoes[0].filmeId,
      titulo: cinema.salas[0].sessoes[0].filme,
    };
  });
};

const getMoviesByCityId = (cityId) => {
  if (cityId == -1) return null;

  return getMoviesByCinemaId();
};

const getMovieSessionsByCityId = (movieId, cityId) => {
  if (movieId == -1 || cityId == -1) return null;

  return getCinemasByCityId().map((cinema) => {
    return {
      cinemaId: cinema.cinemaId,
      cinema: cinema.nome,
      sala: cinema.salas[0].nome,
      sessao: cinema.salas[0].sessoes[0],
    };
  });
};

const getMovieSessionsByCinemaId = (movieId, cinemaId) => {
  if (movieId == -1 || cinemaId == -1) return null;
  return getMovieSessionsByCityId();
};

module.exports = {
  getAllCities,
  getCinemasByCityId,
  getMoviesByCinemaId,
  getMoviesByCityId,
  getMovieSessionsByCityId,
  getMovieSessionsByCinemaId,
};
