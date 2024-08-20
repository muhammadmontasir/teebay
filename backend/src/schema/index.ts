import gql from "graphql-tag";

export const typeDefs = gql`
  scalar Date
  
  type Query {
    users: [User!]!
    products: [Product!]!
    categories: [CategoryProductType!]!
  }

  type User {
    id: Int!
    user_name: String!
    email: String!
    products: [Product!]!
    possessions: [Product!]!
  }

  type Product {
    id: Int!
    title: String!
    description: String
    status: ProductStatus!
    purchase_price: Float
    rent_price: Float
    rent_type: RentType
    owner: User!
    current_possession: User!
    category: CategoryProductType!
  }

  type CategoryProductType {
    id: Int!
    value: String!
    products: [Product!]!
  }

  enum ProductStatus {
    SOLD
    RENTED
    BORROWED
    AVAILABLE
    BOUGHT
  }

  enum RentType {
    PER_DAY
    WEEKLY
    FORTNIGHTLY
    MONTHLY
    YEARLY
  }
`;
