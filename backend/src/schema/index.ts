import gql from "graphql-tag";

export const typeDefs = gql`
  scalar Date
  
  type Query {
    me: User
    users: [User!]!
    products: [Product!]!
    getProductById(id: Int!): Product
    categories: [CategoryProductType!]!
    getAllRentType: [RentType]!
  }
  
  type Mutation {
    signUp(user_name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    signOut: Boolean!
    addProduct(
      title: String!
      product_category_id: Int!
      description: String
      status: ProductStatus
      purchase_price: Float
      rent_price: Float
      rent_type: RentType
      owner_id: Int!
    ): Product!
    editProduct(
      id: Int!
      title: String
      product_category_id: Int
      description: String
      status: ProductStatus
      purchase_price: Float
      rent_price: Float
      rent_type: RentType
    ): Product!
    deleteProduct(id: Int!): Boolean!
  }

  type User {
    id: Int!
    user_name: String!
    email: String!
    products: [Product!]!
    possessions: [Product!]!
    token: String
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
    created_at: Date!
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
