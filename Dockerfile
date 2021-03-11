FROM node:14-alpine

ENV WORKDIR /app

WORKDIR $WORKDIR

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]