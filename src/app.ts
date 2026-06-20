import express from "express";
import projectRoutes from "./api/v1/routes/projectRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";

const app = express();
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/admin", adminRoutes);

export default app;
