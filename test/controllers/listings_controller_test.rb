require "test_helper"

class ListingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    agent = Agent.create!(name: "Test Agent", email: "test@example.com")
    @property = Property.create!(title: "Sample House", price: 400000, beds: 2, baths: 1, property_type: "house", suburb: "Northside", agent: agent)
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
