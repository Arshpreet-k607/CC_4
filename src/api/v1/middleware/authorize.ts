import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse } from "../errors/errors";

export function authorize({ hasRole }: { hasRole: string[] }) {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = res.locals.role;

        if (!role) {
            return res.status(HTTP_STATUS.FORBIDDEN)
                .json(errorResponse("Forbidden: No role found", "ROLE_NOT_FOUND"));
        }

        if (!hasRole.includes(role)) {
            return res.status(HTTP_STATUS.FORBIDDEN)
                .json(errorResponse("Forbidden: Insufficient role", "INSUFFICIENT_ROLE"));
        }

        next();
    };
}
