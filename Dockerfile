FROM node:14.17-alpine AS nodinium

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY ./src ./src
COPY tsconfig.json tsconfig.build.json .env ./
RUN npm run build
RUN rm -rf src

CMD ["node", "."]
