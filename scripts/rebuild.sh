#!/bin/bash

figlet -ck "Rebuild"
figlet -ck "EPIC ROAD"
figlet -ck "TRIP"

docker-compose -f docker-compose.base.yml -f docker-compose.development.yml stop front back
docker-compose -f docker-compose.base.yml -f docker-compose.development.yml rm -f front back
docker-compose -f docker-compose.base.yml -f docker-compose.development.yml build --no-cache front back
docker-compose -f docker-compose.base.yml -f docker-compose.development.yml up -d front back
