# develop stage
FROM node:15.14.0-alpine as develop-stage

WORKDIR /app
COPY package*.json ./
RUN yarn global add @quasar/cli
COPY . .

# build stage
FROM develop-stage as build-stage
RUN yarn

ARG API_URL

RUN quasar build

# production stage
FROM nginx:1.17.10 as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist/spa /app
COPY nginx.conf /etc/nginx/nginx.conf
