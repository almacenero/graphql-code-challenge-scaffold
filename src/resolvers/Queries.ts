import {Post} from "./../models/Post"
import { Comment } from "../models"
import { PostItem } from "../dao/Post"
import CommentItem from "../dao/Comment"
const hello = () => {
    return "Hello World"
}

const posts = async () => {
   const posts: PostItem[] = await Post.find()
   const newPosts = posts.map(async (post: PostItem) => {
    const filterComments: any = post.comments.map(async (comment: CommentItem) => {
        const commentItem = await Comment.findOne({id: comment})
        return commentItem
     })
   
    const comments = await Promise.all(filterComments)
    post.comments = comments
    return post
   })
   return await Promise.all(newPosts)
}

export default {hello, posts}

