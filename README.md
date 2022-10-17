# Backend stack for any stratups

- postgresql
- apollo / graphql
- prisma
- nexus

## Development

```
#  first install
yarn install
yarn setup-env
yarn generate
yarn dev:db # run local database
yarn prod:migrate # initialize database

#  development
yarn dev:db # run local database
yarn start # hot-reload development
```

## Database

Database view:

```
yarn prisma:studio
```

Or https://www.beekeeperstudio.io/get and install connect with tunnel

```
brew install --cask beekeeper-studio
```

Make database access from localhost:

```sh
ssh -L 5432:localhost:5432 database.machine.com
```

## Setup github actions pipline

Create github actions secrets with env which you can see in `.env.example`

And infrastructure secrets: https://github.com/fastup-kit/deploy-scripts
