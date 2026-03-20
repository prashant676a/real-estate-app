require "test_helper"

class PropertyTest < ActiveSupport::TestCase
  test "should create property" do
    property = Property.new(title: "Test House", price: 500000, beds: 3, baths: 2, property_type: "apartment", suburb: "Northside")
    assert property.save, "Property did not save"
  end

  test "should not save without title" do
    property = Property.new(price: 500000)
    assert_not property.save, "Saved property without title"
  end
end
