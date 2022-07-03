FROM node:14.15.0-alpine3.12 AS production

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ARG GOOGLE_API_KEY
ENV GOOGLE_API_KEY $GOOGLE_API_KEY

RUN mkdir -p /usr/src/back
WORKDIR /usr/src/back
COPY ./ /usr/src/back

RUN yarn install
RUN npm install -g strapi@3.6.2
# && npm cache clean

EXPOSE 1337

RUN yarn build

CMD ["yarn", "start"]

# --------------------------------------------- #

FROM production AS development

CMD ["yarn", "develop"]
