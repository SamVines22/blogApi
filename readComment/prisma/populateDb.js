const bcryptjs = require("bcryptjs");

const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const pw = await bcryptjs.hash("123",10)
    console.log(pw);
    const newUser = await prisma.users.create({
        data: {
            username: "Lewis",
            password: pw,
            author: true
        }
    })
    console.log(newUser)
}

async function blog() {
    const user = await prisma.users.findUnique({
        where: {id:1}
    })
    console.log(user);
    const date = new Date();
    console.log(date);
    const title = "My First Blog Post";
    const text = "This is the text of my first blog post. Isn't it exciting?";
    const newPost = await prisma.posts.create({
        data: {
            title: title,
            text: text,
            userId:user.id,
            published: true,
            datePublished: date
        }
    })
    console.log(newPost);

}

//main();

//blog();