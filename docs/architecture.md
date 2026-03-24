# Architecture Overview

This application demonstrates a decoupled modern web architecture for a real-estate properties platform. It separates concerns between a backend API and a frontend client, optimizing for both developer experience and application performance.

## Backend (Rails API)
The backend is built with Ruby on Rails configured in **API-only mode**. 
- **Database Engine**: PostgreSQL
- **Key optimizations**: 
  - `pg_trgm` extension is enabled and used on the `title` and `description` fields. This GIN (Generalized Inverted Index) approach enables hyper-fast partial string matching `ILIKE "%keyword%"`, avoiding normal slow full table scans.
- **Data Flow**: The frontend securely pulls serialized JSON from `ListingsController`.
- **Authorization Flow**: The controller implements a basic pseudo-token mechanism via the HTTP Headers to gatekeep administrative data (e.g. `internal_notes`).

## Frontend (Next.js React)
The frontend relies on the newest Next.js capabilities to consume the Rails API.
- **Styling framework**: Tailwind CSS v4.
- **State management**: React Hooks (`useState`, `useEffect`, `useCallback`). 
- **Performance**: Debounced fetch requests to the API so search keywords do not hammer the backend. 
- **Routing**: Client-side routing seamlessly integrated via `next/navigation`.

## Directory Structure
- `/app/models`: Core data entities and Query Objects (search methods).
- `/app/controllers`: API endpoint handlers.
- `/frontend`: Isolated Next.js React client application.
- `/docs`: Project documentation and architecture details.
