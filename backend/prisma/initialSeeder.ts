import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const categories = [
        { value: 'electronics' },
        { value: 'furniture' },
        { value: 'home appliances' },
        { value: 'sporting goods' },
        { value: 'outdoor' },
    ];

    for (const category of categories) {
        await prisma.categoryProductType.create({
            data: category,
        });
    }

    // Seed Users
    const alice = await prisma.user.create({
        data: {
            user_name: 'Alice',
            email: 'alice@example.com',
            password: 'password123',
            token: ''
        },
    });

    const bob = await prisma.user.create({
        data: {
            user_name: 'Bob',
            email: 'bob@example.com',
            password: 'password123',
            token: ''
        },
    });

    const charlie = await prisma.user.create({
        data: {
            user_name: 'Charlie',
            email: 'charlie@example.com',
            password: 'password123',
            token: ''
        },
    });

    // Seed Products
    await prisma.product.create({
        data: {
            title: 'Laptop',
            product_category_id: 1, // electronics
            description: 'A high-end laptop',
            status: 'AVAILABLE',
            purchase_price: 1500.0,
            rent_price: 100.0,
            rent_type: 'PER_DAY',
            owner_id: alice.id,
            current_possession_id: alice.id,
        },
    });

    await prisma.product.create({
        data: {
            title: 'Office Desk',
            product_category_id: 2, // furniture
            description: 'A sturdy desk for office use',
            status: 'AVAILABLE',
            purchase_price: 200.0,
            rent_price: 20.0,
            rent_type: 'MONTHLY',
            owner_id: bob.id,
            current_possession_id: bob.id,
        },
    });

    await prisma.product.create({
        data: {
            title: 'Smartphone',
            product_category_id: 1, // electronics
            description: 'Latest model smartphone',
            status: 'SOLD',
            purchase_price: 999.0,
            owner_id: charlie.id,
            current_possession_id: charlie.id,
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
