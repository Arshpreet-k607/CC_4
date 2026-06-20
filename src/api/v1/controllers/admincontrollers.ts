import { Request, Response } from "express";
import { auth } from "../../../config/firebaseConfig";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const adminController = {
    async setCustomClaims(req: Request, res: Response) {
        const { uid, role } = req.body;

        await auth.setCustomUserClaims(uid, { role });

        res.status(HTTP_STATUS.OK).json({
            message: "Role assigned",
            uid,
            role,
        });
    },
};
