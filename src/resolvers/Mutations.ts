import {Post} from "./../models/Post"
import { Comment } from "../models"
import { PostItem } from "../dao/Post"
import CommentItem from "../dao/Comment"
import commentValidator from "../validatorsSchema/CommentValidator"
import postValidator from "../validatorsSchema/postValidator"
import newCommentArgument from "../dao/NewCommentArgument"
import newPostArgument from "../dao/newPostArgument"

const newComment = async (obj: newCommentArgument) => {
   const comment: CommentItem = obj.comment

   const {error} = commentValidator.validate(comment)

   if(error) {
     throw new Error(error.message);
   } else {
    try {
        const commentItem = await new Comment({
            name: comment.name,
            email: comment.email,
            body: comment.body,
            post: obj.PostId 
           })
    
           const post = await Post.findOne({id: obj.PostId})
    
           post?.comments.push(commentItem.id)
    
           await post?.save()
           await commentItem.save()
    
           return commentItem
       }catch(error){
           return error
       }
   }
  
}

const newPost = async (obj: newPostArgument) => {
    console.log("obje", obj)
    const post: PostItem = obj.post

    const {error} = postValidator.validate(post)

    if(error) {
     throw new Error(error.message);
   } else {
   try {
    const postItem = await new Post({
        title: post.title,
        body: post.body,
       })
    
   await postItem.save()
   
   return postItem
   }catch(error){
    return error
   }
   }
 }

export default { newComment, newPost}