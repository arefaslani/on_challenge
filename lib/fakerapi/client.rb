require 'httparty'

module FakerApi
  class Client
    include HTTParty

    base_uri 'fakerapi.it/api/v1'

    def companies(seed: 1, quantity: 200)
      self.class
        .get('/companies', query: { _seed: seed, _quantity: quantity })
        .fetch('data')
    end
  end
end
