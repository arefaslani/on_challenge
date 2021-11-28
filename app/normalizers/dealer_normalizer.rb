class DealerNormalizer
  attr_reader :items

  def self.call(items)
    new(items).normalize
  end

  def initialize(items)
    @items = items
  end

  def normalize()
    items.map do |item|
      {
        **item.slice('name', 'phone', 'country'),
        **item.
          fetch('addresses', [{}]).
          first.
          slice('street', 'zipcode', 'city', 'latitude', 'longitude')
      }.with_indifferent_access
    end
  end
end
