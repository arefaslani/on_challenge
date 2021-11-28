FactoryBot.define do
  factory :dealer do
    name { "Ebert and Sons" }
    street { "993 Prosacco Wells" }
    zipcode { "84631" }
    city { "Gordonside" }
    country { "Iraq" }
    latitude { -32.350944 }
    longitude { 8.837339 }
    sequence :phone do |n|
      "+210090151871#{n}"
    end
  end
end
