FROM node:latest

WORKDIR /urs/src/app


COPY package*.json ./


COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]

