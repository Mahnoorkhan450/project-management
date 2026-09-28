import api from "@/lib/axios";

export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "COMPLETED";

export type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export type ProjectStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "ARCHIVED";

/* =========================================
   DASHBOARD TEAM MEMBER
========================================= */

export interface DashboardTeamMember {
  id: number;
  name: string;
  email: string;
  profileImage?: string | null;
}

/* =========================================
   DASHBOARD STATS
========================================= */

export interface DashboardStats {
  projects: number;
  tasks: number;
  teamMembers: number;
  members: DashboardTeamMember[];
  completion: number;
  highPriority: number;
  dueSoon: number;
}

/* =========================================
   TASK DISTRIBUTION
========================================= */

export interface TaskDistribution {
  TODO: number;
  IN_PROGRESS: number;
  COMPLETED: number;
}

/* =========================================
   DASHBOARD PROJECT
========================================= */

export interface DashboardProject {
  id: number;
  name: string;
  status: ProjectStatus;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  members: number;
  teamName: string | null;
  createdAt: string;
  updatedAt: string;
}

/* =========================================
   DASHBOARD TASK
========================================= */

export interface DashboardTask {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;

  project: {
    id: number;
    name: string;
  };

  assignedTo: {
    id: number;
    name: string;
    email: string;
  } | null;
}

/* =========================================
   DASHBOARD DEADLINE
========================================= */

export interface DashboardDeadline {
  id: number;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;

  project: {
    id: number;
    name: string;
  };
}

/* =========================================
   DASHBOARD ACTIVITY
========================================= */

export interface DashboardActivity {
  id: string;
  type: "TASK" | "PROJECT";
  title: string;
  status: TaskStatus | null;

  user: {
    id: number;
    name: string;
  };

  date: string;
}

/* =========================================
   COMPLETE DASHBOARD DATA
========================================= */

export interface DashboardData {
  stats: DashboardStats;
  taskDistribution: TaskDistribution;
  projects: DashboardProject[];
  myTasks: DashboardTask[];
  deadlines: DashboardDeadline[];
  activity: DashboardActivity[];
}

/* =========================================
   GET DASHBOARD
========================================= */

export const getDashboard = async (): Promise<DashboardData> => {
  const response = await api.get<DashboardData>(
    "/dashboard"
  );

  return response.data;
};