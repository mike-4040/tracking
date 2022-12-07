/*
Initial database creation script
Should be run only once to create the database

NOTE: Local user info is in `docker-compose.local-postgres.yml`

1. Connect to postgress
  - pgAdmin
  - OR psql 
      - `npm run pg:connect`
      -  in conteiner shell `psql -d postgres -U index_app`
2. Create database
  - run the following script

3. Run migration. Follow the instructions in `scripts/db_migration.sql`
*/

CREATE DATABASE index WITH 
  OWNER = index_app 
  ENCODING = 'UTF8' 
  LC_COLLATE = 'en_US.utf8' 
  LC_CTYPE = 'en_US.utf8' 
  TABLESPACE = pg_default 
  CONNECTION LIMIT = -1 
  IS_TEMPLATE = False;
