# Index Tracking Backend

## Pre-requisite

1. Make sure that docker is installed
1. Install dependencies: `npm install`
1. Make local secrets file: `cp .env.template .env`
1. Set local secrets in the `.env`
1. Start postgres `npm run pg:up`
1. Create database. Instructions in `scripts/pg_init.sql`
2. Run database migration. Instructions in `scripts/pg_migration.sql`

## Running the app

```bash
# start local postgres
$ npm run pg:up

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Running in container locally

Sometimes, we want to run application locally.
We can do this with the following commands:

```bash
# build the container
$ npm run cont:build

# start the app in container
$ npm run cont:start

# stop and delete the container
$ npm run cont:drop
```

**NOTE** Dockerfile used for deployment, be careful updating it.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Cleanup

If you don't need local postgres running you can stop it by running `npm run pg:stop`
