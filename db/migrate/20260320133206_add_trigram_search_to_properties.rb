class AddTrigramSearchToProperties < ActiveRecord::Migration[8.1]
  def change
    enable_extension 'pg_trgm'

    add_index :properties, :title, opclass: :gin_trgm_ops, using: :gin
    add_index :properties, :description, opclass: :gin_trgm_ops, using: :gin
  end
end
