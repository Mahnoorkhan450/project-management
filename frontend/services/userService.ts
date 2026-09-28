import api from "@/lib/axios";

/* =========================================
   PROFILE TYPES
========================================= */

export interface ProfileDepartment {
  id: number;
  name: string;
}

export interface ProfileTeam {
  id: number;
  name: string;
}

export interface ProfileTeamMembership {
  id: number;
  role:
    | "MEMBER"
    | "TEAM_LEAD"
    | "MANAGER";

  team: ProfileTeam;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";

  departmentId: number | null;

  department: ProfileDepartment | null;

  teamMemberships: ProfileTeamMembership[];

  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/* =========================================
   MEMBER DETAILS
========================================= */

export interface MemberProject {
  id: number;
  name: string;
  description: string | null;

  status:
    | "ACTIVE"
    | "COMPLETED"
    | "ARCHIVED";

  createdAt: string;
  updatedAt: string;
}

export interface MemberTask {
  id: number;
  title: string;

  status:
    | "TODO"
    | "IN_PROGRESS"
    | "COMPLETED";

  priority:
    | "LOW"
    | "MEDIUM"
    | "HIGH";

  dueDate: string | null;

  project: {
    id: number;
    name: string;
  } | null;
}

export interface MemberStatistics {
  assigned: number;
  completed: number;
  pending: number;
}

export interface MemberDetailsData {
  id: number;
  name: string;
  email: string;
  role: string;

  teamName: string;
  departmentName: string;

  joinedAt: string;

  statistics: MemberStatistics;

  assignedProjects: MemberProject[];

  assignedTasks: MemberTask[];
}

/* =========================================
   GET MY PROFILE
========================================= */

export const getMyProfile =
  async (): Promise<UserProfile> => {
    const response = await api.get(
      "/users/profile"
    );

    return response.data.user;
  };

/* =========================================
   UPDATE MY PROFILE
========================================= */

export const updateMyProfile = async (
  data: UpdateProfileData
): Promise<UserProfile> => {
  const response = await api.put(
    "/users/profile",
    data
  );

  return response.data.user;
};

/* =========================================
   CHANGE PASSWORD
========================================= */

export const changeMyPassword = async (
  data: ChangePasswordData
): Promise<string> => {
  const response = await api.patch(
    "/users/profile/password",
    data
  );

  return response.data.message;
};

/* =========================================
   GET USER DETAILS
========================================= */

export const getUserDetails = async (
  userId: number
): Promise<MemberDetailsData> => {
  const response = await api.get(
    `/users/${userId}/details`
  );

  return response.data.details;
};

/* =========================================
   USER LIST
========================================= */

export interface User {
  id: number;
  name: string;
  email: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");

  const data = response.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.users)) {
    return data.users;
  }

  return [];
};
