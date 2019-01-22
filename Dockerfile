FROM jrottenberg/ffmpeg:3.3-alpine
FROM node:11-alpine

COPY --from=0 / /

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3000
CMD [ "yarn", "start" ]