FROM node:12.18-alpine AS party-wall
WORKDIR /usr/src/app
COPY . .
RUN npm i
RUN npm run build
RUN rm -rf src
EXPOSE 3000
CMD ["node", "."]
