import mongoose from "mongoose";
import { ReviewType } from "../utils/types";

const reviewModel = new mongoose.Schema<ReviewType>({

    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String }
}, { timestamps: true })

// Checking that 1 user can review a book only once
reviewModel.index({ user: 1, book: 1 }, { unique: true });

export const ReviewModel = mongoose.model("Reviews", reviewModel)