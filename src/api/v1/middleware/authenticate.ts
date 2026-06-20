import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse } from "../errors/errors";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(HTTP_STATUS.UNAUTHORIZED)
            .json(errorResponse("Unauthorized: No token provided", "TOKEN_NOT_FOUND"));
    }

    const token = header.split(" ")[1];

    try {
        const decoded = await auth.verifyIdToken(token);
        res.locals.uid = decoded.uid;
        res.locals.role = decoded.role;
        next();
    } catch (err) {
        return res.status(HTTP_STATUS.UNAUTHORIZED)
            .json(errorResponse("Unauthorized: Invalid token", "TOKEN_INVALID"));
    }
}
