const request = require('supertest');
const { grantPrivilege } = require("./../helpers/strapi");


 it('testing airport route', async () => {
   await request(strapi.server) // app server is an instance of Class: http.Server
     .get('/airports')
     .expect(200) // Expect response http code 200
 });

 it('testing city route', async () => {
   await request(strapi.server) // app server is an instance of Class: http.Server
     .get('/cities')
     .expect(200) // Expect response http code 200
 });

 it('testing country route', async () => {
   await request(strapi.server) // app server is an instance of Class: http.Server
     .get('/countries')
     .expect(200) // Expect response http code 200
 });

 it('testing flight route', async () => {
   await request(strapi.server) // app server is an instance of Class: http.Server
     .get('/flights')
     .expect(200) // Expect response http code 200
 });

 it('testing hotel route', async () => {
   await request(strapi.server) // app server is an instance of Class: http.Server
     .get('/hotels')
     .expect(200) // Expect response http code 200
 });

 it('testing room route', async () => {
   await request(strapi.server) // app server is an instance of Class: http.Server
     .get('/rooms')
     .expect(200) // Expect response http code 200
 });

 it('testing room-availability route', async () => {
   await request(strapi.server) // app server is an instance of Class: http.Server
     .get('/room-availabilities')
     .expect(200) // Expect response http code 200
 });

 it('testing token route', async () => {
   await request(strapi.server) // app server is an instance of Class: http.Server
     .get('/tokens')
     .expect(200) // Expect response http code 200
 });

 it('testing user-trip route', async () => {
   await request(strapi.server) // app server is an instance of Class: http.Server
     .get('/user-trips')
     .expect(200)
 });

