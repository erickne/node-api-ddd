FROM node:16
WORKDIR /usr/src/server
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 500
CMD npm start