const prisma = require("../prisma/pool");
const db = require("../prisma/queries");
const jwt = require("jsonwebtoken");

const queries = new db;

async function home(req,res) {
    console.log('home');
    const posts = await prisma.posts.findMany({select: {
        id:true,
        title:true,
        text:true,
        datePublished:true
    }});
    if (req.user !== undefined) {
        res.render("homepage", {posts:posts, name: req.user.username})
    }
    else {
    res.render("homepage", {posts:posts, name: null});
    }
    
}

async function seeOnePost(req,res) {
 //   console.log(req.token);
    console.log(req.user);
    const id = parseInt(req.params.postid)
    const data = await queries.getPost(id);
    res.render("onePost", {data:data});
}

async function commentPost(req,res) {
    console.log(req.body.comment);
    const postId = parseInt(req.params.postid);
    const userId = parseInt(req.user.id);
    await queries.addComment(postId, userId, req.body.comment);
    res.redirect(`/posts/${postId}`);
}

module.exports = {home, seeOnePost, commentPost}