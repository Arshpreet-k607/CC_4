import { Request, Response } from "express";
import { projectService } from "../services/projectService";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const projectController = {
    getAll(req: Request, res: Response) {
        const data = projectService.getAll();
        res.status(HTTP_STATUS.OK).json({
            message: "Projects retrieved",
            count: data.length,
            data,
        });
    },

    getById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const project = projectService.getById(id);

        if (!project) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Project not found" });
        }

        res.status(HTTP_STATUS.OK).json(project);
    },

    create(req: Request, res: Response) {
        const { name, status } = req.body;
        const newProject = projectService.create({ name, status });

        res.status(HTTP_STATUS.CREATED).json({
            message: "Project created",
            data: newProject,
        });
    },

    update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const updated = projectService.update(id, req.body);

        if (!updated) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Project not found" });
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Project updated",
            data: updated,
        });
    },

    delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        const deleted = projectService.delete(id);

        if (!deleted) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Project not found" });
        }

        res.status(HTTP_STATUS.OK).json({ message: "Project deleted" });
    },
};
