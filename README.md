# Backend server for any stratups

- postgresql
- apollo / graphql
- prisma
- nexus

## Development

```
#  first install
cat .env.example > .env
yarn install
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
