FROM node:18.15-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@9.7.1
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
