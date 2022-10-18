# bulder
FROM node:16-alpine3.12 AS builder

WORKDIR /app

COPY ./.yarn ./.yarn
COPY .yarnrc.yml ./package.json ./yarn.lock ./tsconfig.json ./
RUN yarn set version berry
RUN yarn install --immutable
COPY ./src ./src
COPY ./prisma ./prisma
RUN yarn generate
RUN yarn build

# runner
FROM node:17-alpine3.12

RUN addgroup -S node-group && adduser -S node-app -G node-group
USER node-app

WORKDIR /app

COPY --chown=node-app:node-group --from=builder ./app/.yarn ./.yarn
COPY --chown=node-app:node-group --from=builder ./app/build ./build
COPY --chown=node-app:node-group --from=builder ./app/prisma ./prisma
COPY --chown=node-app:node-group --from=builder ./app/package.json ./app/yarn.lock ./app/.yarnrc.yml ./
COPY --chown=node-app:node-group --from=builder ./app/.pnp* ./

CMD yarn prod:start