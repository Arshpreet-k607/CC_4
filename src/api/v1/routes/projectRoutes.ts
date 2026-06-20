import { Router } from "express";
import { projectController } from "../controllers/projectcontrollers";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router = Router();

router.get("/", authenticate, authorize({ hasRole: ["admin", "lead", "developer"] }), projectController.getAll);
router.get("/:id", authenticate, authorize({ hasRole: ["admin", "lead", "developer"] }), projectController.getById);
router.post("/", authenticate, authorize({ hasRole: ["admin", "lead"] }), projectController.create);
router.put("/:id", authenticate, authorize({ hasRole: ["admin", "lead"] }), projectController.update);
router.delete("/:id", authenticate, authorize({ hasRole: ["admin"] }), projectController.delete);

export default router;
