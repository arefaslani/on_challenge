FROM ruby:2.7.1-slim

RUN apt-get update -qq && apt-get install -y \
  build-essential libssl-dev software-properties-common curl cmake pkg-config \
  && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN add-apt-repository "deb https://deb.nodesource.com/node_14.x buster main"
RUN curl -sSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -

RUN add-apt-repository "deb https://apt.postgresql.org/pub/repos/apt/ buster-pgdg main"
RUN curl -sSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

RUN apt-get update -qq && apt-get install -y \
  nodejs libpq-dev postgresql-client-13 \
  && apt-get clean \
  && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && npm install -g yarn@1

WORKDIR /app
COPY Gemfile* .
RUN bundle install

COPY package.json .
COPY yarn.lock .
RUN yarn install --check-files --silent --ignore-optional

COPY . .

# Add a script to be executed every time the container starts.
COPY docker/entrypoint.sh /usr/bin/
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Configure the main process to run when running the image
CMD ["rails", "server", "-b", "0.0.0.0"]
