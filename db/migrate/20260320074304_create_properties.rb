class CreateProperties < ActiveRecord::Migration[8.1]
  def change
    create_table :properties do |t|
      t.string :title
      t.text :description
      t.integer :price
      t.integer :beds
      t.integer :baths
      t.string :property_type
      t.string :suburb
      t.string :address
      t.references :agent, null: false, foreign_key: true
      t.boolean :is_active
      t.text :internal_notes

      t.timestamps
    end
  end
end
