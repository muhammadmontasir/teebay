import {GraphQLScalarType, Kind} from 'graphql';
import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = 'your_secret_key';

const customScalarResolver = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        serialize(value) {
            if (value instanceof Date) {
                return value.getTime();
            }
            throw Error('GraphQL Date Scalar serializer expected a `Date` object');
        },
        parseValue(value) {
            if (typeof value === 'number') {
                return new Date(value);
            }
            throw new Error('GraphQL Date Scalar parser expected a `number`');
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return new Date(parseInt(ast.value, 10));
            }
            return null;
        },
    }),
};

export const resolvers = {
    Query: {
        users: async () => await prisma.user.findMany(),
        products: async () => await prisma.product.findMany(),
        categories: async () => await prisma.categoryProductType.findMany(),
        me: async (_: any, __: any, context: any) => {
            const token = context.token;
            if (!token) throw new Error('Not authenticated');

            const decodedToken = jwt.verify(token, SECRET_KEY) as { userId: number };
            return prisma.user?.findUnique({
                where: {id: decodedToken.userId},
            });
        },
        getProductById: async (_: any, args: any) => await prisma.product.findUnique({
            where: { id: args.id },
        }),
        getAllRentType: async () => {
            const result: { RentType: string }[] = await prisma.$queryRaw`SELECT unnest(enum_range(NULL::"RentType"))::text AS "RentType";`;
            return result.map(row => row.RentType);
        },
    },
    Mutation: {
        signUp: async (_: any, { user_name, email, password }: any) => {
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                throw new Error('Email already in use');
            }

            const token = jwt.sign({ userId: email }, SECRET_KEY, { expiresIn: '1d' });

            if (!token) {
                throw new Error('Failed to create user');
            }

            const user = await prisma.user.create({
                data: {
                    user_name,
                    email,
                    password,
                    token
                },
            });

            if (!user) {
                throw new Error('Failed to create user');
            }

            return user;
        },

        login: async (_: any, { email, password }: any) => {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) throw new Error('No such user found');

            if (user.password !== password) throw new Error('Invalid password');

            const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1d' });

            return {
                ...user,
                token,
            };
        },
        signOut: () => {
            return true;
        },

        addProduct: async (_: any, args: any) => {
            const { title, product_category_id, description, status, purchase_price, rent_price, rent_type, owner_id } = args;

            return prisma.product.create({
                data: {
                    title,
                    product_category_id,
                    description,
                    status,
                    purchase_price,
                    rent_price,
                    rent_type,
                    owner_id,
                    current_possession_id: owner_id,  // Assuming the owner is the initial possessor
                },
            });
        },

        editProduct: async (_: any, args: any) => {
            const { id, title, product_category_id, description, status, purchase_price, rent_price, rent_type } = args;

            return prisma.product?.update({
                where: {id},
                data: {
                    title,
                    product_category_id,
                    description,
                    status,
                    purchase_price,
                    rent_price,
                    rent_type,
                },
            });
        },

        deleteProduct: async (_: any, { id }: any) => {
            await prisma.product?.delete({
                where: { id },
            });

            return true;
        },
    },
    User: {
        products: async (parent: { id: number; }) =>
            await prisma.product?.findMany({ where: { owner_id: parent.id } }),
        possessions: async (parent: { id: number; }) =>
            await prisma.product?.findMany({ where: { current_possession_id: parent.id } }),
    },
    Product: {
        owner: async (parent: { owner_id: number; }) =>
            await prisma.user?.findUnique({ where: { id: parent.owner_id } }),
        current_possession: async (parent: { current_possession_id: number; }) =>
            await prisma.user?.findUnique({ where: { id: parent.current_possession_id } }),
        category: async (parent: { product_category_id: number; }) =>
            await prisma.categoryProductType?.findUnique({ where: { id: parent.product_category_id } }),
    },
    CategoryProductType: {
        products: async (parent: { id: number; }) =>
            await prisma.product?.findMany({ where: { product_category_id: parent.id } }),
    },
    ...customScalarResolver
};
