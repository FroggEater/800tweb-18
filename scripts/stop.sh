#!/bin/bash

docker-compose -f docker-compose.base.yml -f docker-compose.development.yml stop front back
