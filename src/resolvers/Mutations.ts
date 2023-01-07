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

const newPost = async (obj: any) => {
    console.log("obj--->", obj)
    const post: PostItem = obj.post
   try {
    const postItem: any = await new Post({
        title: post.title,
        body: post.body,
       })
    
   await postItem.save()
   
   return postItem
   }catch(error){
    return error
   }
 }

export default { newComment, newPost}