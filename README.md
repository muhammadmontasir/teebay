
# Project Documentation

## Overview

This document explains the steps taken to build a full-stack application using React, Apollo Client, Node.js (Express.js), GraphQL, Prisma ORM, and PostgreSQL. The application uses Apollo Client for managing GraphQL queries and mutations on the frontend, with Prisma handling the database operations in the backend.

## Tech Stack

- **Frontend:** React.js with Apollo Client for GraphQL
- **Backend:** Express.js with Apollo Server for GraphQL
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Cache Management:** Apollo InMemoryCache

## Project Structure

### Backend (Node.js + Express.js)

- **Server Setup:** Express.js is used to set up a GraphQL server.
- **Prisma ORM:** Used for database operations and migrations.
- **GraphQL Schema:** Defined for handling operations related to product management, including the enum types.

### Frontend (React.js)

- **Apollo Client:** Used for interacting with the GraphQL server.
- **InMemoryCache:** Used to store the GraphQL query results and manage the cache.
- **React Components:** Handle the UI and interact with Apollo Client for CRUD operations.

## Implementation Details

### Backend Implementation

1. **Setting Up the Server:**
   - Used Express.js to set up a basic server.
   - Integrated Apollo Server to handle GraphQL queries and mutations.
   - Defined GraphQL schema including types, queries, and mutations.

2. **Database Configuration:**
   - Set up PostgreSQL as the database.
   - Defined Prisma schema with models.
   - Used Prisma Migrate to create the necessary database tables.

3. **GraphQL Resolvers:**
   - Implemented resolvers for fetching and manipulating product data, including the enum values.
   - Created specific resolvers to handle fetching all values and CRUD operations for products.

### Frontend Implementation

1. **Apollo Client Setup:**
   - Configured Apollo Client to connect to the GraphQL backend.
   - Set up `InMemoryCache` to store query results.

2. **Fetching Data:**
   - Used Apollo Client’s `useQuery` hook to fetch data from the backend.
   - Implemented a query to fetch all values and populated them in a dropdown component.

3. **Handling Mutations:**
   - Implemented mutations for adding, updating, and deleting products.
   - Used Apollo Client’s `useMutation` hook and cache manipulation methods to ensure the cache stays in sync with the database.

4. **Cache Management:**
   - Ensured that when data is removed from the database, it is also removed from Apollo’s `InMemoryCache`.
   - Used cache updates (e.g., `update` and `refetchQueries`) after mutations to avoid storing unnecessary data.

### Corner Cases

- **Enum Handling:** Made sure the `RentType` enum in the PostgreSQL database, Prisma schema, and GraphQL schema were consistent to avoid mismatches.
- **Cache Invalidation:** Ensured that any deletion in the database is accurately reflected in the Apollo cache to prevent stale data.
- **Error Handling:** Implemented error handling for both backend and frontend to manage cases where database operations or GraphQL queries fail.

## Commands to Start the Project

### Backend (Express.js + Prisma)

1. **Install Dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Set Up Environment Variables:**

   Create a `.env` file in the `backend` directory with the following content:

   ```plaintext
   DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
   ```

   Replace `username`, `password`, `localhost`, and `mydatabase` with your actual PostgreSQL credentials.

3. **Run Prisma Migrations:**

   ```bash
   npx prisma migrate dev --name init
   ```

4. **Start the Server:**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:4000`.

### Frontend (React.js + Apollo Client)

1. **Install Dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Set Up Environment Variables:**

   Create a `.env` file in the `frontend` directory with the following content:

   ```plaintext
   REACT_APP_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
   ```

3. **Start the Development Server:**

   ```bash
   npm start
   ```

   The React application will start on `http://localhost:3000`.

## Conclusion

The application was built using React, Apollo Client, Express.js, GraphQL, Prisma, and PostgreSQL. The main focus was on maintaining data consistency between the frontend, backend, and the database, with a strong emphasis on managing the Apollo Client cache effectively.
