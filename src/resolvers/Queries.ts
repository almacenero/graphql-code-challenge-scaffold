import {Post}from "./../models/Post"
const hello = () => {
    return "Hello World"
}

const posts = async () => {
   const posts = await Post.find()
   console.log("posts--->", posts)
   //need pagination
   return posts
}

export default {hello, posts}

