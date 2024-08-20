import gql from "graphql-tag";
// import userSchema from './user';
// import messageSchema from './message';
const schema = gql `
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;
export default [schema];
// export default [linkSchema, userSchema, messageSchema];
