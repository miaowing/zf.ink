FROM node:10.16.0-alpine

WORKDIR /opt/app

COPY dist dist/
COPY node_modules node_modules/
RUN mkdir -p dist/configs

ENV NODE_ENV production

EXPOSE 3000
CMD [ "node", "./dist/main.js" ]
