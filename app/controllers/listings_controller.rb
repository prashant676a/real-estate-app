class ListingsController < ApplicationController
  def index
    @page = (params[:page] || 1).to_i
    @per_page = 5
    @is_admin = current_user_is_admin?

    @properties = Property.search(params)
    @total = @properties.count

    @properties = @properties.limit(@per_page).offset((@page - 1) * @per_page)

    render json: {
      data: @properties.map { |p| serialize_property(p, @is_admin) },
      meta: {
        current_page: @page,
        per_page: @per_page,
        total_items: @total,
        total_pages: (@total.to_f / @per_page).ceil
      }
    }
  end

  def show
    @property = Property.find(params[:id])
    @is_admin = current_user_is_admin?
    
    render json: { data: serialize_property(@property, @is_admin) }
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Property not found" }, status: :not_found
  end

  private

  def current_user_is_admin?
    # Simple mock authentication for the take-home assessment
    request.headers["Authorization"] == "Bearer admin-token"
  end

  def serialize_property(property, is_admin)
    data = {
      id: property.id,
      title: property.title,
      price: property.price,
      beds: property.beds,
      baths: property.baths,
      property_type: property.property_type,
      suburb: property.suburb,
      description: property.description,
      address: property.address,
      is_active: property.is_active,
      agent_id: property.agent_id
    }
    data[:internal_notes] = property.internal_notes if is_admin
    data
  end
end
