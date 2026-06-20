import { Router } from "express";
import { adminController } from "../controllers/adminController";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router = Router();

router.post(
    "/setCustomClaims",
    authenticate,
    authorize({ hasRole: ["admin"] }),
    adminController.setCustomClaims
);

export default router;
