FROM node:14.17.3-alpine3.14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node","server.js"]
