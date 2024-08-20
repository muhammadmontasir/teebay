import { GraphQLScalarType, Kind } from 'graphql';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const customScalarResolver = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        serialize(value) {
            if (value instanceof Date) {
                return value.getTime(); // Convert outgoing Date to integer for JSON
            }
            throw Error('GraphQL Date Scalar serializer expected a `Date` object');
        },
        parseValue(value) {
            if (typeof value === 'number') {
                return new Date(value); // Convert incoming integer to Date
            }
            throw new Error('GraphQL Date Scalar parser expected a `number`');
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                // Convert hard-coded AST string to integer and then to Date
                return new Date(parseInt(ast.value, 10));
            }
            // Invalid hard-coded value (not an integer)
            return null;
        },
    }),
};

export const resolvers = {
    Query: {
        users: async () => await prisma.user.findMany(),
        products: async () => await prisma.product.findMany(),
        categories: async () => await prisma.categoryProductType.findMany(),
    },
    User: {
        products: async (parent: { id: number; }) =>
            await prisma.product.findMany({ where: { owner_id: parent.id } }),
        possessions: async (parent: { id: number; }) =>
            await prisma.product.findMany({ where: { current_possession_id: parent.id } }),
    },
    Product: {
        owner: async (parent: { owner_id: number; }) =>
            await prisma.user.findUnique({ where: { id: parent.owner_id } }),
        current_possession: async (parent: { current_possession_id: number; }) =>
            await prisma.user.findUnique({ where: { id: parent.current_possession_id } }),
        category: async (parent: { product_category_id: number; }) =>
            await prisma.categoryProductType.findUnique({ where: { id: parent.product_category_id } }),
    },
    CategoryProductType: {
        products: async (parent: { id: number; }) =>
            await prisma.product.findMany({ where: { product_category_id: parent.id } }),
    },
    ...customScalarResolver
};

//
// export default [
//     customScalarResolver,
//     // userResolvers,
//     // messageResolvers,
// ];
