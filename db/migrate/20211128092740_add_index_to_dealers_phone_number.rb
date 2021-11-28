class AddIndexToDealersPhoneNumber < ActiveRecord::Migration[6.0]
  def change
    add_index :dealers, :phone, unique: true
  end
end
