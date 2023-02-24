FROM node:16
WORKDIR /usr/src/server
COPY ./package.json .
RUN npm install --only=prod