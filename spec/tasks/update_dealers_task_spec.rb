require 'rails_helper'

Rails.application.load_tasks

describe "dealers:update" do
  after(:each) do
    Rake::Task["dealers:update"].reenable
  end

  before(:each) do
    create_list(:dealer, 10)
    allow(FakerApi::Client).to receive(:get).with('/companies', anything).and_return(
      JSON.parse(
        File.read(
          Rails.root.join('lib/faker_api/sample_response.json')
        )
      )
    )
  end

  it "syncs dealers with the data received from FakerAPI" do
    expect(Dealer.count).to eq 10
    Rake::Task["dealers:update"].invoke
    # It removes unsynced data from the database
    expect(Dealer.count).to eq 5
    expect(Dealer.all.pluck(:phone).sort).to eq %w(
      +2100901518715
      +3762920067100
      +4625644473212
      +5905392311037
      +4465709875811
    ).sort
  end
end
