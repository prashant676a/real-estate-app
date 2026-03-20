# Real Estate Listing App

## Overview
A simple Rails application to search and view real estate listings with role-aware behavior.

## Features
- Property search with filters: price, beds, baths, type, suburb, keyword
- Pagination
- Property detail page
- Admin view with extra metadata (`internal_notes`)

## Setup

1. Install dependencies
```bash
bundle install
```

2. Setup database
```bash
rails db:create
rails db:migrate
rails db:seed
```

3. Run the server
```bash
rails server
```

Visit: http://localhost:3000/listings

---

## Usage
- Toggle Admin/User view via the button at top of index or show page
- Example URLs:
```
/listings?price_min=500000
/listings?beds=2&property_type=apartment
/listings?is_admin=true
```

---

## Testing
Run:
```bash
rails test
```

Covers:
- Property model validation
- ListingsController index
- Admin view conditional rendering

---

## Notes
- No external CSS frameworks used (minimal styling only)
- All database operations use ActiveRecord
- Focused on requirements (role-based behavior, filters, pagination, CRUD)