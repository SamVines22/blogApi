const prisma = require("./pool")


class db {
    async getPost(id) {
        const post = await prisma.posts.findUnique({relationLoadStrategy: 'join', where: {id:id}, include: {Comments: {include: {user: {select: {username:true}}}}}});
        return post;
    }

    async getUser(id) {
        const user = await prisma.users.findUnique({where: {id:id}, select: {id: true,username:true}});
        return user;
    }

    async addComment(postId, userId, comment ) {
        await prisma.comments.create({data: {
            text: comment,
            userId: userId,
            postId: postId
        }})
        return;
    }
}

module.exports = db;