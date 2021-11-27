require 'rails_helper'

describe DealerNormalizer do
  it 'responds to .call' do
    expect(described_class).to respond_to(:call)
  end

  describe '.call' do
    let(:input) {
      FakerApi::Client.new.companies()
    }

    before do
      allow(FakerApi::Client).to receive(:get).with('/companies', anything).and_return(
        JSON.parse(
          File.read(
            Rails.root.join('lib/faker_api/sample_response.json')
          )
        )
      )
    end

    context 'with multiple items' do
      it 'returns a hash of name, phone, and first address properties for each item' do
        outcome = DealerNormalizer.call(input)

        outcome.each_with_index do |dealer_hash, index|
          expect(input[index].fetch('name')).to eq dealer_hash.fetch('name')
          expect(input[index].fetch('phone')).to eq dealer_hash.fetch('phone')
          expect(input[index].fetch('country')).to eq dealer_hash.fetch('country')
          expect(input[index]['addresses'][0].fetch('street')).
            to eq dealer_hash.fetch('street')
          expect(input[index]['addresses'][0].fetch('zipcode')).
            to eq dealer_hash.fetch('zipcode')
          expect(input[index]['addresses'][0].fetch('city')).
            to eq dealer_hash.fetch('city')
          expect(input[index]['addresses'][0].fetch('latitude')).
            to eq dealer_hash.fetch('latitude')
          expect(input[index]['addresses'][0].fetch('longitude')).
            to eq dealer_hash.fetch('longitude')
        end
      end
    end
  end
end
