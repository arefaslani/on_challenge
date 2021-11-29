# README
An example application to fetch dealers and show them on a map.
There is a rake task to fetch and sync dealers in the database that can be automated by using
something like a cron job (by using whenever gem for example), kubernetes job, etc. In this example,
we'll run the task manually.

# Building docker images
Please run `docker compose build` to build the docker images.

# Prepairing databases
Run the following command to prepare databases:
```bash
docker compose -f docker-compose.yml -f docker-compose.development.yml run app rails db:setup
docker compose -f docker-compose.yml -f docker-compose.test.yml run app rails db:setup
```

# Running tests
Use the following command to run tests:
```bash
docker compose -f docker-compose.yml -f docker-compose.test.yml run app rspec .
```

# Running the application
Use the following command to run the application:
```bash
docker compose -f docker-compose.yml -f docker-compose.development.yml up
```

Note: To prepare dealers for the first run, please run:
```bash
docker compose -f docker-compose.yml -f docker-compose.development.yml run app rake dealers:update
```
