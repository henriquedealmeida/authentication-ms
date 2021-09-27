import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import basicAuthenticationMiddleware from "../middleware/basic-authentication.middleware";
import ForbiddenError from "../models/forbidden.error.models";
import userRepository from "../repositories/user.repository";
import statusRoute from "./status.route";
import usersRoute from "./users.route";


const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const user = req.user;

        if(!user) {
            throw new ForbiddenError('Usuário não informado.');
        }

        const jwtPayload = { username: user.username };
        const secretKey = 'my_secret_key';
        const jwtOptions = { subject: user?.uuid };

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);
        res.status(StatusCodes.OK).json({token: jwt});

    } catch (error) {
        next(error);
    }

})

export default authorizationRoute;