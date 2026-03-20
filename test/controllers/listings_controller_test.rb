require "test_helper"

class ListingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @property = Property.create!(title: "Sample House", price: 400000, beds: 2, baths: 1, property_type: "house", suburb: "Northside")
  end

  test "should get index" do
    get listings_url
    assert_response :success
    assert_select "div", /Sample House/
  end

  test "admin view shows internal notes" do
    @property.update(internal_notes: "Test note")
    get listings_url(is_admin: true)
    assert_response :success
    assert_select "p", /Test note/
  end
end
