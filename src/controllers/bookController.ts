import { Request, Response } from 'express';
import bookService from '../services/bookService';
import { statusCodes } from '../helpers';

const statusCode = new statusCodes();
class BookController {

    public async add(req: Request, res: Response) {
        console.log("Service")
        try {
            const data = await bookService.add(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
        }
    }

    public async get(req: Request, res: Response) {
        try {
            const data = await bookService.get(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
        }
    }

    public async getBookById(req: Request, res: Response) {
        try {
            const data = await bookService.getBookById(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
        }
    }

    public async searchBook(req: Request, res: Response) {
        console.log("Controller")
        try {
            const data = await bookService.searchBook(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
        }
    }

}

export default new BookController();