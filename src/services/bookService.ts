import { BookModel } from "../models/bookModel";
import { ReviewModel } from "../models/reviewModel";
import { statusCodes } from '../helpers';
const statusCode = new statusCodes();

class BooksService {

    public async add(req: any, res: any): Promise<Record<string, any>> {
        let bookData
        try {
            const { title, author, year, language, pages, imageLink, link, country, genre } = req.body

            let data = await BookModel.create({
                title, author, year, language, pages, imageLink, link, country, genre
            })

            bookData = await BookModel.findById(data._id)

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { bookData }
    }

    public async get(req: any, res: any): Promise<Record<string, any>> {
        let bookData
        try {

            const { page = '1', limit = '10', author, genre } = req.query;
            const pageNumber = parseInt(page as string, 10);
            const pageSize = parseInt(limit as string, 10);

            // Adding author and genre filter to query
            const filters: Record<string, any> = {};
            if (author || genre) {
                filters.$or = [];

                if (author) {
                    filters.$or.push({ author: { $regex: author, $options: 'i' } });
                }

                if (genre) {
                    filters.$or.push({ genre: { $regex: genre, $options: 'i' } });
                }
            }

            bookData = await BookModel.find(filters)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize);

            // Checking if book exists or not
            if (!bookData) return statusCode.notFound(res, "Book not found")

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { bookData }
    }

    public async getBookById(req: any, res: any): Promise<Record<string, any>> {
        let bookData
        try {
            const { id } = req.params
            const { page = '1', limit = '10' } = req.query;
            const pageNumber = parseInt(page as string, 10);
            const pageSize = parseInt(limit as string, 10);

            let books = await BookModel.findById(id)
            if (!books) return statusCode.notFound(res, "Book not found")

            // Calculating average rating of the book by
            //  collecting all ratings of a book and taking average of it
            const avgResult = await ReviewModel.aggregate([
                { $match: { book: books._id } },
                {
                    $group: {
                        _id: '$book',
                        averageRating: { $avg: '$rating' },
                        totalReviews: { $sum: 1 },
                    },
                },
            ]);
            const averageRating = avgResult[0]?.averageRating || 0;
            const totalReviews = avgResult[0]?.totalReviews || 0;

            const reviews = await ReviewModel.find({ book: books._id })
                .populate('user', 'firstName lastName email')
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .sort({ createdAt: -1 });


            bookData = {
                books,
                averageRating: parseFloat(averageRating.toFixed(2)),
                totalReviews,
                reviews: {
                    page: pageNumber,
                    limit: pageSize,
                    data: reviews,
                },
            }

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { bookData }
    }

    public async searchBook(req: any, res: any): Promise<Record<string, any>> {
        let bookData
        try {
            const keyword = req.query.q;

            if (!keyword) {
                return statusCode.badRequest(res, "Search query is required")
            }

            const books = await BookModel.find({
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { author: { $regex: keyword, $options: 'i' } }
                ]
            });

            bookData = { count: books.length, results: books }

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { bookData }
    }

}

export default new BooksService();