import { ObjectId } from "mongoose"

export type TButton = {
    name: string
    type: 'button' | 'submit' | 'reset'
    onClick?: ()=>void
    className?: string
}

type TImage = {
    secure_url: string
    public_id: string
}

type TData = {
    _id?: ObjectId | string
    id?: ObjectId | string
    caption?: string
    image?: TImage
}

export type TActionResponse = {
    success: boolean,
    message?: string,
    errors?: Record<string ,string[]>
    data?: TData
}