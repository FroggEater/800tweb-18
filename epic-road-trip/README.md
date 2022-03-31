# Development setup
- Copy `.env.dist` to `.env` (the env file is already populated with basic values, no need to config anything)
- Install docker + docker-compose on your machine
- Build Container on Docker: `docker-compose -f docker-compose.base.yml -f docker-compose.development.yml build --no-cache front back`
- Launch Container / Project `docker-compose -f docker-compose.base.yml -f docker-compose.development.yml up -d front back`


-To access to the DB : docker-compose -f docker-compose.base.yml -f docker-compose.development.yml up -d phpmyadmin
and go to port 34003
