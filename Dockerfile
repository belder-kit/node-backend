# bulder
FROM node:17-alpine3.12 AS builder

WORKDIR /app

COPY ./package.json ./yarn.lock ./tsconfig.json ./
RUN yarn

COPY ./src ./src
RUN yarn build

# runner
FROM node:17-alpine3.12

RUN addgroup -S node-group && adduser -S node-app -G node-group
USER node-app

WORKDIR /app

COPY --chown=node-app:node-group --from=builder ./app ./
CMD yarn start