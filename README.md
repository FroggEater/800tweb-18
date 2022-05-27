# Epic Road Trip - v0.3.2

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
