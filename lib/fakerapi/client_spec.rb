require 'spec_helper'
require_relative 'client'
require 'byebug'

describe FakerApi::Client do
  it 'responds to companies' do
    expect(subject).to respond_to :companies
  end


  describe '#companies' do
    before do
      allow(FakerApi::Client).to receive(:get).with('/companies').and_return(
        JSON.parse(
          File.read(
            File.expand_path(File.join(File.dirname(__FILE__), 'sample_response.json'))
          )
        )
      )
    end

    it 'fetches all the companies from fakerapi' do
      result = subject.companies

      expect(result).to include(hash_including("email" => "gbarton@muller.org"))
      expect(result).to include(hash_including("email" => "vladimir01@yahoo.com"))
      expect(result).to include(hash_including("email" => "jackson01@hotmail.com"))
      expect(result).to include(hash_including("email" => "katharina.shanahan@trantow.biz"))
      expect(result).to include(hash_including("email" => "destiney.wuckert@roberts.com"))
    end
  end
end
