import { ObjectId, Document } from "mongoose"

export type BooksType = {
    title: string,
    author: string,
    year: number,
    language: string,
    pages: number,
    imageLink: string,
    link: string,
    country: string,
    genre: string,
}

export type UserType = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export type ReviewType = {
    book: ObjectId,
    user: ObjectId,
    rating: number,
    comment: string,
}