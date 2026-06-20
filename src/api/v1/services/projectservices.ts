import { Project } from "../models/interfaces";

let projects: Project[] = [
    { id: 1, name: "Website Redesign", status: "active", createdAt: "2025-01-10T10:00:00.000Z" },
    { id: 2, name: "Mobile App v2", status: "planning", createdAt: "2025-01-08T10:00:00.000Z" },
    { id: 3, name: "API Migration", status: "active", createdAt: "2025-01-05T10:00:00.000Z" },
    { id: 4, name: "Security Audit", status: "completed", createdAt: "2025-01-03T10:00:00.000Z" },
];

export const projectService = {
    getAll() {
        return projects;
    },

    getById(id: number) {
        return projects.find(p => p.id === id);
    },

    create(data: { name: string; status: string }) {
        const newProject: Project = {
            id: projects.length + 1,
            name: data.name,
            status: data.status,
            createdAt: new Date().toISOString(),
        };
        projects.push(newProject);
        return newProject;
    },

    update(id: number, data: Partial<Project>) {
        const project = projects.find(p => p.id === id);
        if (!project) return null;

        Object.assign(project, data);
        return project;
    },

    delete(id: number) {
        const index = projects.findIndex(p => p.id === id);
        if (index === -1) return false;

        projects.splice(index, 1);
        return true;
    }
};
