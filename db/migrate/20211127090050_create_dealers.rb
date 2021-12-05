class CreateDealers < ActiveRecord::Migration[6.0]
  def change
    create_table :dealers do |t|
      t.string :name
      t.string :phone, null: false, index: true, unique: true
      t.string :street
      t.string :city
      t.string :zipcode
      t.string :country
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end
  end
end
