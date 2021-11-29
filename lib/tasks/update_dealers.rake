namespace :dealers do
  desc 'Fetch and update dealers'
  task update: :environment do
    companies_data = FakerApi::Client.new.companies
    dealers_data = DealerNormalizer.call(companies_data)

    # Remove dealers from DB whos phone number is not in the dealers data
    Dealer.
      where.not(phone: dealers_data.map { |dealer_data| dealer_data.fetch(:phone) })
      .delete_all

    # Insert new dealers to the DB or update if it already exist
    Dealer.import(
      dealers_data,
      on_duplicate_key_update: {
        conflict_target: [:phone],
        columns: Dealer.column_names.reject do |column_name|
          %w(id created_at phone updated_at).include? column_name
        end
      },
      batch_size: 100
    )
  end
end
