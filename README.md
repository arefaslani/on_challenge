# README
An example application to fetch dealers and show them on a map.
There is a rake task to fetch and sync dealers in the database that can be automated by using
something like a cron job (by using whenever gem for example), kubernetes job, etc. In this example,
we'll run the task manually.

# Assumptions
Here we assume that all the data is in the following address (because the API doesn't have any
pagination mechanism):
```
https://fakerapi.it/api/v1/companies?_seed=1&_quantity=200
```
We also assume that that the dealers' phone numbers are unique.
If in subsequent requests a phone number disappears, it means the item has been deleted.
I decided to go with Rails only because setting it up with webpacker for the React part was easier.
But usually for simple projects like this, I rather to go with Sinatra or Roda.

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
