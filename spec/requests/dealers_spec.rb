require 'rails_helper'

RSpec.describe "Dealers", type: :request do
  describe "GET /dealers" do
    it "returns http success" do
      get "/dealers"
      expect(response).to have_http_status(:success)
    end
  end
end
