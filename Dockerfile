FROM node:12-alpine

WORKDIR /srv/app
COPY ["./package.json", "./yarn.lock", "./"]

RUN yarn install --silent

COPY . .
