FROM node:12.18-alpine AS nodinium
WORKDIR /usr/src/app
COPY . .
RUN npm i
RUN npm run build
RUN rm -rf src
EXPOSE 3200
CMD ["node", "."]
