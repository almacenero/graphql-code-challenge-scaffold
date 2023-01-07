import {Post} from "./../models/Post"
import { Comment } from "../models"
import { PostItem } from "../dao/Post"
import CommentItem from "../dao/Comment"

const newComment = async (obj: any) => {
   const comment: CommentItem = obj.comment
   try {
    const commentItem: any = await new Comment({
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

export default { newComment}