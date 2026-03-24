class Property < ApplicationRecord
  belongs_to :agent
  validates :title, presence: true

  def self.search(params)
    scope = all
    scope = scope.where("price >= ?", params[:price_min]) if params[:price_min].present?
    scope = scope.where("price <= ?", params[:price_max]) if params[:price_max].present?
    scope = scope.where(beds: params[:beds]) if params[:beds].present?
    scope = scope.where(property_type: params[:property_type]) if params[:property_type].present?
    scope = scope.where("suburb ILIKE ?", "%#{params[:suburb]}%") if params[:suburb].present?
    if params[:keyword].present?
      # Now utilizing the pg_trgm index
      scope = scope.where("title ILIKE ? OR description ILIKE ?", "%#{params[:keyword]}%", "%#{params[:keyword]}%")
    end
    scope
  end
end
