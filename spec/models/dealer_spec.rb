require 'rails_helper'

describe Dealer, type: :model do
  it { should respond_to(:name) }
  it { should respond_to(:phone) }
  it { should respond_to(:street) }
  it { should respond_to(:city) }
  it { should respond_to(:country) }
  it { should respond_to(:zipcode) }
  it { should respond_to(:latitude) }
  it { should respond_to(:longitude) }

  it 'has a valid factory' do
    expect(build(:dealer)).to be_valid
  end
end
