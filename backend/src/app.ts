import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import {
  notFoundMiddleware,
} from "./middleware/notFoundMiddleware.js";

import {
  errorMiddleware,
} from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

/* ==========================================
   ROOT
========================================== */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Project Management API is running",
  });
});

/* ==========================================
   API ROUTES
========================================== */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/departments",
  departmentRoutes
);

app.use(
  "/api/teams",
  teamRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/settings",
  settingsRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

/* ==========================================
   ERROR HANDLING
========================================== */

// Must be after all routes
app.use(notFoundMiddleware);

// Must be the last middleware
app.use(errorMiddleware);

export default app;