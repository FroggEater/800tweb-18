const request = require("supertest");

it("should return flights", async () => {
  await request(strapi.server.httpServer)
    .get("/api/hello")
    .expect(200) // Expect response http code 200
    .then((data) => {
      expect(data.text).toBe("Hello World!"); // expect the response text
    });
});

//tester que le token api via la cron se met bien à jour
// db amadeus token
//tester que l'api nous renvoie la data qu'on veut
