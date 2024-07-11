
# Customer Point

backend test Indivara Group


## Installation

After clone this repo, install project with npm

```bash
  cd customer
  npm install
```

Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
  cp .env.example .env
```
customize the database connection with your postgres connection

Build project
```bash
    npm run Build
```

## Databases
Create Postgres database with name `dev_talis5_charging` and migrate table
```bash
    npx prisma migrate dev --name init
```

## Running project
run the project in dev mode
```bash
    npm run dev
```
    
