/*
 Postgres migration script
 Should be run every time the database structure changes
 1. Connect to postgress container
 `npm run pg:connect`
 2. Run migration
 `sh /scripts/pg_migrate.sh`
 */

-- DROP TABLE IF EXISTS public.barcodes;

CREATE TABLE IF NOT EXISTS public.barcodes (
  barcode_id serial PRIMARY KEY,
  barcode TEXT NOT NULL,
  scanner_id TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  account_id TEXT NOT NULL
);

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users (
  user_id serial PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at BIGINT NOT NULL,
  invalidated_at BIGINT,
  salt TEXT NOT NULL,
  org_id INTEGER
);

-- DROP TABLE IF EXISTS public.orgs;

CREATE TABLE IF NOT EXISTS public.orgs (
  org_id serial PRIMARY KEY,
  name TEXT NOT NULL
);

-- DROP TABLE IF EXISTS public.apps;

CREATE TABLE IF NOT EXISTS public.apps (
  app_id serial PRIMARY KEY,
  org_id INTEGER NOT NULL,
  name TEXT NOT NULL
);

-- DROP TABLE IF EXISTS public.locations;

CREATE TABLE IF NOT EXISTS public.locations (
  location_id serial PRIMARY KEY,
  app_id INTEGER NOT NULL,
  org_id INTEGER NOT NULL,
  name TEXT NOT NULL
);
