# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_03_20_133206) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pg_trgm"

  create_table "agents", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email"
    t.string "name"
    t.string "phone"
    t.datetime "updated_at", null: false
  end

  create_table "properties", force: :cascade do |t|
    t.string "address"
    t.bigint "agent_id", null: false
    t.integer "baths"
    t.integer "beds"
    t.datetime "created_at", null: false
    t.text "description"
    t.text "internal_notes"
    t.boolean "is_active"
    t.integer "price"
    t.string "property_type"
    t.string "suburb"
    t.string "title"
    t.datetime "updated_at", null: false
    t.index ["agent_id"], name: "index_properties_on_agent_id"
    t.index ["description"], name: "index_properties_on_description", opclass: :gin_trgm_ops, using: :gin
    t.index ["price"], name: "index_properties_on_price"
    t.index ["property_type"], name: "index_properties_on_property_type"
    t.index ["suburb"], name: "index_properties_on_suburb"
    t.index ["title"], name: "index_properties_on_title", opclass: :gin_trgm_ops, using: :gin
  end

  add_foreign_key "properties", "agents"
end
