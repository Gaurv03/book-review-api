import { Request, Response } from 'express';
import bookService from '../services/bookService';
import { statusCodes } from '../helpers';
import reviewService from '../services/reviewService';

const statusCode = new statusCodes();
class ReviewController {

    public async submitReview(req: Request, res: Response) {
        console.log("Service")
        try {
            const data = await reviewService.submitReview(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
        }
    }


    public async updateReview(req: Request, res: Response) {
        try {
            const data = await reviewService.updateReview(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
        }
    }

    public async deleteReview(req: Request, res: Response) {
        try {
            const data = await reviewService.deleteReview(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
        }
    }

}

export default new ReviewController();