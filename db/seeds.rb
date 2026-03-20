# Clear existing data to prevent duplicates
puts "Cleaning up database..."
Property.destroy_all
Agent.destroy_all

puts "Creating Agents..."
agents = [
  Agent.create!(name: "Sarah Jenkins", email: "sarah@realestate.com", phone: "555-0101"),
  Agent.create!(name: "Michael Chen", email: "michael@realestate.com", phone: "555-0102"),
  Agent.create!(name: "Elena Rodriguez", email: "elena@realestate.com", phone: "555-0103")
]

puts "Creating Properties..."
properties_data = [
  { title: "Modern Downtown Loft", price: 850000, beds: 2, baths: 2, property_type: "apartment", suburb: "Downtown", address: "123 Main St, Apt 4B", description: "Beautifully renovated loft with exposed brick walls.", is_active: true },
  { title: "Cozy Suburban Family Home", price: 650000, beds: 4, baths: 3, property_type: "house", suburb: "Oakridge", address: "45 Elm Tree Rd", description: "Spacious backyard, perfect for a growing family.", is_active: true },
  { title: "Luxury Penthouse Suite", price: 2100000, beds: 3, baths: 4, property_type: "apartment", suburb: "Downtown", address: "1 Skyline View", description: "Panoramic views of the city skyline. Premium finishes.", is_active: true },
  { title: "Charming Victorian Terrace", price: 920000, beds: 3, baths: 2, property_type: "house", suburb: "West End", address: "88 Victoria St", description: "Historic charm meets modern convenience.", is_active: true },
  { title: "Compact Studio Apartment", price: 350000, beds: 1, baths: 1, property_type: "apartment", suburb: "Eastside", address: "50 College Ave", description: "Great starter home or investment property.", is_active: true },
  { title: "Riverfront Townhouse", price: 1250000, beds: 3, baths: 3, property_type: "house", suburb: "Riverside", address: "12 Waterway Blvd", description: "Wake up to stunning river views every morning.", is_active: true },
  { title: "Spacious Country Estate", price: 3500000, beds: 6, baths: 5, property_type: "house", suburb: "Hillsboro", address: "1000 Green Pastures Ln", description: "Over 5 acres of land with a private pool and guest house.", is_active: true },
  { title: "Sleek Minimalist Condo", price: 780000, beds: 2, baths: 2, property_type: "apartment", suburb: "Midtown", address: "200 Design Ave", description: "Floor-to-ceiling windows and open plan living.", is_active: true },
  { title: "Classic Brick Tudor", price: 880000, beds: 4, baths: 2, property_type: "house", suburb: "Oakridge", address: "77 Heritage Way", description: "Timeless architecture in a quiet, leafy neighborhood.", is_active: true },
  { title: "Urban Oasis with Terrace", price: 540000, beds: 1, baths: 1, property_type: "apartment", suburb: "West End", address: "33 Garden Row", description: "Features a massive 500sqft private outdoor terrace.", is_active: true },
  { title: "Starter Home Fixer-Upper", price: 420000, beds: 2, baths: 1, property_type: "house", suburb: "Eastside", address: "99 Maple Dr", description: "Bring your toolbelt! Great potential.", is_active: true },
  { title: "Executive Family Residence", price: 1450000, beds: 5, baths: 4, property_type: "house", suburb: "Riverside", address: "400 Grand Blvd", description: "High-end finishes and appliances throughout.", is_active: true },
  { title: "Boutique Apartment", price: 620000, beds: 2, baths: 1, property_type: "apartment", suburb: "Midtown", address: "15 Art District", description: "Located in the heart of the cultural precinct.", is_active: true },
  { title: "Tranquil Cul-de-sac Home", price: 710000, beds: 3, baths: 2, property_type: "house", suburb: "Hillsboro", address: "5 Peaceful Ct", description: "Safe and quiet environment, right next to the park.", is_active: true },
  { title: "Off-the-plan Investment", price: 480000, beds: 2, baths: 2, property_type: "apartment", suburb: "Downtown", address: "88 Future St", description: "Expected completion next year. Great returns.", is_active: false }
]

properties_data.each_with_index do |data, index|
  # Assign an agent round-robin style
  agent = agents[index % agents.length]
  
  Property.create!(
    **data,
    agent: agent,
    internal_notes: "Follow up with owner next week."
  )
end

puts "Database seeded successfully!"
puts "- Created #{Agent.count} agents."
puts "- Created #{Property.count} properties."
