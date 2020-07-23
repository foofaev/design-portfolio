FROM node:12-alpine

WORKDIR /srv/app
COPY ["./package.json", "./"]

RUN yarn install --silent

COPY . .
