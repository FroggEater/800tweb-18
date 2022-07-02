# Epic Road Trip - v0.9.0

## Development setup
- Copy `.env.dist` to `.env` (the env file is already populated with basic values, no need to config anything)
- Install docker + docker-compose on your machine
- Build Container on Docker: `docker-compose -f docker-compose.base.yml -f docker-compose.development.yml build --no-cache front back`
- Launch Container / Project `docker-compose -f docker-compose.base.yml -f docker-compose.development.yml up -d front back`

## More Tools
- To access and manage data in DB without strapi:
   build container PHP My Admin: `docker-compose -f docker-compose.base.yml -f docker-compose.development.yml up -d phpmyadmin`

## Access
- Front(nuxt): http://localhost:34001

- Back(strapi): http://localhost:34002/admin
  (you can create your super admin account in the first visit)

- BDD(mariadb): http://localhost:34003
  (login & mdp in environment file)

## Installing new package
You will have to open a terminal on the corresponding container.
For example, the front container : `docker-compose -f docker-compose.base.yml -f docker-compose.development.yml exec front /bin/sh`

Then you can: `yarn add PACKAGE_NAME`

## Building on Apple Silicon
Docker won't be able to build anything on Apple Silicon as is (eg. M1, probably M2 too). You will have to temporarily modify
both `docker-compose` files and add `platform: linux/amd64` under each service. Example:

```yml
sql:
  platform: linux/amd64
  container_name: 800TWEB_DB
  ...
```