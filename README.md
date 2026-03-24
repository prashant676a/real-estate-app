# Real Estate Listing App (API + Next.js Frontend)

## Overview
A scalable real estate listing platform demonstrating a decoupled architecture with a Rails API backend and a Next.js frontend, built for a mid-level full-stack engineer assessment.

## Key Features & Improvements
- **Decoupled Architecture**: Separated the backend into a robust API and the frontend into a standalone Next.js React application.
- **Advanced Search Indexing**: Implemented `pg_trgm` (trigram) GIN indexing in PostgreSQL to optimize wildcard `ILIKE` keyword searches, dropping query times significantly.
- **Extracted Business Logic**: Search and filtering logic has been extracted from the controller into the `Property.search` model scope.
- **Secure Role Flag**: Replaced the arbitrary `?is_admin=true` URL parameter with a secure mock `Authorization: Bearer admin-token` HTTP Header.
- **API Serialized Responses**: Responses properly formatted mapping cleanly to the frontend interfaces, with pagination metadata.

## Setup Instructions

### 1. Rails Backend API (Port 3000)
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

3. Run the Rails server
```bash
rails server
```
The API is now running at `http://localhost:3000/listings`.

### 2. Next.js Frontend App (Port 3001)
Open a new terminal window:
1. Navigate to the frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the Next.js development server
```bash
npm run dev -- -p 3001
```

Visit: http://localhost:3001 to view the application!

---

## API Examples

**Search listings:**
```bash
curl "http://localhost:3000/listings?property_type=apartment&keyword=Views"
```

**Get a listing as an admin (sees internal notes):**
```bash
curl "http://localhost:3000/listings/1" -H "Authorization: Bearer admin-token"
```

---

## Testing
Run backend tests:
```bash
rails test
```

Covers:
- Property model validations
- ListingsController index and show endpoints
- Mock Admin Authorization behavior