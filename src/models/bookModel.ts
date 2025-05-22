import mongoose from "mongoose";
import { BooksType } from "../utils/types";

const bookModel = new mongoose.Schema<BooksType>({

    title: { type: String, require: true },
    author: { type: String, require: true },
    country: { type: String, require: true },
    year: { type: Number, require: true },
    language: { type: String, require: true, },
    pages: { type: Number, require: true },
    imageLink: { type: String, require: true, },
    link: { type: String, require: true },
    genre: { type: String, require: true }

}, { timestamps: true })

export const BookModel = mongoose.model("Books", bookModel)
