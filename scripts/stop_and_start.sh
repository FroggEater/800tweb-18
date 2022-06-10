#!/bin/bash
figlet -ck "Restart"
figlet -ck "EPIC ROAD"
figlet -ck "TRIP"

docker-compose -f docker-compose.base.yml -f docker-compose.development.yml stop front back
docker-compose -f docker-compose.base.yml -f docker-compose.development.yml up -d
