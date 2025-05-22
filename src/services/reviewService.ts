import { BookModel } from "../models/bookModel";
import { ReviewModel } from "../models/reviewModel";
import { statusCodes } from '../helpers';
import { UserModel } from "../models/userModel";
const statusCode = new statusCodes();

class ReviewsService {

    public async submitReview(req: any, res: any): Promise<Record<string, any>> {
        let reviewData
        try {
            const userId = req.userId;
            const bookId = req.params.id;
            const { rating, comment } = req.body;

            // Check if book exists
            const book = await BookModel.findById(bookId);
            if (!book) return statusCode.notFound(res, "No review found")

            // Check if user already reviewed this book
            const existingReview = await ReviewModel.findOne({ book: bookId, user: userId });
            if (existingReview) {
                return statusCode.badRequest(res, "You have already reviewed this book")
            }

            // Create review
            const review = await ReviewModel.create({ book: bookId, user: userId, rating, comment });

            reviewData = { message: 'Review submitted', review }

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { reviewData }
    }

    public async updateReview(req: any, res: any): Promise<Record<string, any>> {
        let reviewData
        try {
            const reviewId = req.params.id;
            const userId = req.userId;
            const { rating, comment } = req.body;

            // Find review by ID
            const review = await ReviewModel.findById(reviewId);
            console.log(review)
            if (!review) {
                return statusCode.notFound(res, 'Review not found');
            }

            // Check if review belongs to user
            if (review.user.toString() !== userId) {
                return statusCode.forbidden(res, 'You can only update your own review');
            }

            // Update fields
            if (rating !== undefined) review.rating = rating;
            if (comment !== undefined) review.comment = comment;

            await review.save();

            reviewData = review
        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { reviewData }
    }

    public async deleteReview(req: any, res: any): Promise<Record<string, any>> {
        try {
            const reviewId = req.params.id;
            const userId = req.userId;

            // Find the review
            const review = await ReviewModel.findById(reviewId);
            if (!review) {
                return statusCode.notFound(res, 'Review not found');
            }

            // Check ownership
            if (review.user.toString() !== userId) {
                return statusCode.forbidden(res, 'You can only delete your own review');
            }

            // Delete
            await ReviewModel.findByIdAndDelete(reviewId);

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return {}
    }
}

export default new ReviewsService();
