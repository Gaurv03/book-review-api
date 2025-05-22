import { Request, Response } from 'express';
import userService from '../services/userService';
import { statusCodes } from '../helpers';

const statusCode = new statusCodes();
class UserController {
    public async signup(req: Request, res: Response) {
        try {
            const data = await userService.signup(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
        }
    }
    public async login(req: Request, res: Response) {
        try {
            const data = await userService.login(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
        }
    }
    public async logout(req: Request, res: Response) {
        try {
            const data = await userService.logout(req, res);
            return statusCode.success(res, "Request Acknowledged", data)
        } catch (error: any) {
            console.log(error)
        }
    }

}

export default new UserController();