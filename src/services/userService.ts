import bcrypt from 'bcrypt';
import { UserModel } from "../models/userModel";
import { statusCodes } from '../helpers';
var jwt = require('jsonwebtoken');

const statusCode = new statusCodes();
class UserService {

    public async signup(req: any, res: any): Promise<Object> {
        let userData
        try {
            const { firstName, lastName, password, confirmPassword, email } = req.body;

            if (password !== confirmPassword) {
                return statusCode.badRequest(res, "Password does not match")
            }
            let userCheck = await UserModel.findOne({ email });

            // Checking if user with same email exists
            if (userCheck) {
                return statusCode.badRequest(res, "User already exist")
            }

            // Hashing the password
            const hashedPassword = await bcrypt.hash(password, 10);

            userData = await UserModel.create({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })

        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { userData }
    }

    public async login(req: any, res: any): Promise<any> {
        let userCheck, token
        try {
            const { email, password } = req.body;

            // Checking if user exists
            userCheck = await UserModel.findOne({ email });

            if (!userCheck) {
                return statusCode.badRequest(res, "User not found")
            } else {
                // Checking password
                const userPassword = userCheck.password as string;
                const passwordCheck = await bcrypt.compare(password, userPassword)
                if (!passwordCheck) {
                    return statusCode.badRequest(res, "Incorrect password")
                }
            }

            // Setting user data to token
            const tokenData = {
                userId: userCheck._id,
                firstName: userCheck.firstName,
                lastName: userCheck.lastName
            }

            // Creating Token
            token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' })

            // Setting cookies with token
            res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return { token }
    }

    public async logout(req: any, res: any): Promise<any> {
        try {

            // Clearing token cookie
            res.cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: "strict" })
        } catch (error) {
            console.log(error)
            throw new Error('Error creating item: ' + error);
        }
        return "Logged Out"
    }

}

export default new UserService();
