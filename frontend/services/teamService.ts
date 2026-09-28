import api from "@/lib/axios";

export type TeamRole =
  | "MEMBER"
  | "TEAM_LEAD"
  | "MANAGER";

export interface TeamUser {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface TeamMember {
  id: number;
  userId: number;
  teamId: number;
  role: TeamRole;
  user: TeamUser;
}

export interface TeamDepartment {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
  description?: string | null;
}

export interface Team {
  id: number;
  name: string;
  description: string | null;

  department: TeamDepartment;

  members: TeamMember[];

  _count: {
    members: number;
    projects: number;
  };

  createdAt: string;
  updatedAt: string;
}

/* =========================================
   MEMBER DETAILS
========================================= */

export interface MemberStatistics {
  assignedTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

export interface MemberProject {
  id: number;
  name: string;
  status:
    | "ACTIVE"
    | "COMPLETED"
    | "ARCHIVED";
}

export interface TeamMemberDetails {
  id: number;
  userId: number;
  teamId: number;
  teamRole: TeamRole;
  joinedAt: string;

  user: TeamUser & {
    department: TeamDepartment | null;
    createdAt: string;
    updatedAt: string;
  };

  team: {
    id: number;
    name: string;
    description: string | null;
    department: TeamDepartment;
  };

  statistics: MemberStatistics;

  projects: MemberProject[];
}

/* =========================================
   TEAM MEMBERSHIP
========================================= */

export interface TeamMembership {
  id: number;
  userId: number;
  teamId: number;
  role: TeamRole;
  createdAt: string;
  updatedAt: string;

  team: {
    id: number;
    name: string;
    description: string | null;

    department: {
      id: number;
      name: string;
    };
  };
}

/* =========================================
   TEAM INPUTS
========================================= */

export interface CreateTeamData {
  name: string;
  description?: string;
  departmentId: number;
}

export interface UpdateTeamData {
  name: string;
  description?: string;
  departmentId: number;
}

export interface AddTeamMemberData {
  userId: number;
  role: TeamRole;
}

/* =========================================
   TEAM API
========================================= */

export const getTeams = async (): Promise<Team[]> => {
  const response = await api.get(
    "/teams"
  );

  return response.data.data;
};

export const getTeamById = async (
  id: number
): Promise<Team> => {
  const response = await api.get(
    `/teams/${id}`
  );

  return response.data.data;
};

export const createTeam = async (
  data: CreateTeamData
): Promise<Team> => {
  const response = await api.post(
    "/teams",
    data
  );

  return response.data.data;
};

export const updateTeam = async (
  id: number,
  data: UpdateTeamData
): Promise<Team> => {
  const response = await api.put(
    `/teams/${id}`,
    data
  );

  return response.data.data;
};

export const deleteTeam = async (
  id: number
): Promise<void> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid team ID");
  }

  await api.delete(
    `/teams/${id}`
  );
};

/* =========================================
   DEPARTMENTS
========================================= */

export const getDepartments = async (): Promise<
  Department[]
> => {
  const response = await api.get(
    "/departments"
  );

  return response.data.data;
};

/* =========================================
   ADD TEAM MEMBER
========================================= */

export const addTeamMember = async (
  teamId: number,
  data: AddTeamMemberData
): Promise<TeamMember> => {
  const response = await api.post(
    `/teams/${teamId}/members`,
    data
  );

  return response.data.data;
};

/* =========================================
   UPDATE MEMBER ROLE
========================================= */

export const updateTeamMemberRole = async (
  teamId: number,
  userId: number,
  role: TeamRole
): Promise<TeamMember> => {
  const response = await api.put(
    `/teams/${teamId}/members/${userId}`,
    { role }
  );

  return response.data.data;
};

/* =========================================
   REMOVE TEAM MEMBER
========================================= */

export const removeTeamMember = async (
  teamId: number,
  userId: number
): Promise<void> => {
  await api.delete(
    `/teams/${teamId}/members/${userId}`
  );
};

/* =========================================
   MEMBER DETAILS
========================================= */

export const getTeamMemberDetails = async (
  teamId: number,
  userId: number
): Promise<TeamMemberDetails> => {
  const response = await api.get(
    `/teams/${teamId}/members/${userId}`
  );

  return response.data.data;
};

/* =========================================
   MY TEAM MEMBERSHIPS
========================================= */

export const getMyTeamMemberships =
  async (): Promise<TeamMembership[]> => {
    const response = await api.get(
      "/teams/my-memberships"
    );

    return response.data.data;
  };