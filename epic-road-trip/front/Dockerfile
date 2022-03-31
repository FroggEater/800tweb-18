FROM node:14.15.0-alpine3.12 AS production

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ARG EPIC_ROAD_TRIP_EXTERNAL_API_URL
ENV EPIC_ROAD_TRIP_EXTERNAL_API_URL $EPIC_ROAD_TRIP_EXTERNAL_API_URL

ENV NUXT_HOST=0.0.0.0

RUN apk add --update --no-cache \
  git

RUN mkdir -p /usr/src/front
WORKDIR /usr/src/front
COPY . /usr/src/front

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]

EXPOSE 3000

# --------------------------------------------- #

FROM production AS development

ARG EPIC_ROAD_TRIP_INTERNAL_API_URL
ENV EPIC_ROAD_TRIP_INTERNAL_API_URL $EPIC_ROAD_TRIP_INTERNAL_API_URL

CMD ["yarn", "dev"]
