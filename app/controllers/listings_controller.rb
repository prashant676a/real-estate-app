class ListingsController < ApplicationController
  def index
    @properties = Property.all
  
    if params[:price_min].present?
      @properties = @properties.where("price >= ?", params[:price_min])
    end
  
    if params[:price_max].present?
      @properties = @properties.where("price <= ?", params[:price_max])
    end
  
    if params[:beds].present?
      @properties = @properties.where(beds: params[:beds])
    end
  
    if params[:property_type].present?
      @properties = @properties.where(property_type: params[:property_type])
    end
  
    if params[:suburb].present?
      @properties = @properties.where("suburb ILIKE ?", "%#{params[:suburb]}%")
    end
  
    if params[:keyword].present?
      @properties = @properties.where(
        "title ILIKE ? OR description ILIKE ?",
        "%#{params[:keyword]}%",
        "%#{params[:keyword]}%"
      )
    end
  end

  def show
    @property = Property.find(params[:id])
  end
end
