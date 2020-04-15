FROM node:12.16-alpine

WORKDIR /
ADD package.json .
ADD yarn.lock       .
RUN yarn --pure-lockfile

RUN yarn install --production=true
ADD src ./src
ADD public ./public


CMD [ "yarn", "start" ]
EXPOSE 3000