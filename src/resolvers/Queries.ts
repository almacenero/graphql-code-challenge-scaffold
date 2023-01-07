import {Post} from "./../models/Post"
import { Comment } from "../models"
import { PostItem } from "../dao/Post"
import CommentItem from "../dao/Comment"

const POSTS_BY_PAGE = 10

const posts = async (obj: any) => {
   const skip = (obj.page - 1) * POSTS_BY_PAGE

   const posts: any = await Post.find()
        .skip(skip)
        .limit(POSTS_BY_PAGE)

   const newPosts = posts.map(async (post: PostItem) => {
    const filterComments: any = post.comments.map(async (comment: CommentItem) => {
        const commentItem = await Comment.findById({_id: comment})
        return commentItem
     })
   
    const comments = await Promise.all(filterComments)
    post.comments = comments
    return post
   })
   
   const hasNextPage = posts.length === POSTS_BY_PAGE
   const endCursor = hasNextPage ? posts[posts.length - 1].id : null

   const resultPosts = await Promise.all(newPosts)
   return {
    edges: resultPosts.map((post: any) => ({
        cursor: post.id,
        node: post
      })),
      pageInfo: {
        hasNextPage,
        endCursor
      }
    } 
}

const findPost = async (obj: any) => {
try{
    return await Post .findById({_id: obj.postId})
}catch(error){
  return error
} 
}

export default { posts, findPost }

