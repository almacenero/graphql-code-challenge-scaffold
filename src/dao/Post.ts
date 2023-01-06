import Comment  from "./Comment"

export interface PostItem {
    title: string
    body: string
    comments: Comment[]
}