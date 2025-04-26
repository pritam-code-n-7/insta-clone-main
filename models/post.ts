import mongoose from "mongoose";


export interface PostType{
    caption:string;
    image: {
        secure_url: string;
        public_id: string;
    }
}

const postSchema = new mongoose.Schema<PostType>({
    caption:{type:String, required: true},
    image:{
        secure_url:{type: String, required: true},
        public_id:{type: String, required: true}
    }
},{timestamps: true})


export const Post = mongoose.models.Post ?? mongoose.model<PostType>("Post", postSchema)