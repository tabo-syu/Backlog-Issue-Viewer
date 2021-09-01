export type UserResponse = {
  id: number;
  userId: string;
  name: string;
  roleType: number;
  lang: string | null;
  mailAddress: string;
};

export type ProjectResponse = {
  id: number;
  projectKey: string;
  name: string;
  chartEnabled: boolean;
  subtaskingEnabled: boolean;
  projectLeaderCanEditProjectLeader: boolean;
  // textFormattingRule: string;
  archived: boolean;
};

export type IssueResponse = {
  id: number;
  projectId: number;
  issueKey: string;
  keyId: number;
  summary: string;
  status: StatusResponse;
  assignee: UserResponse | null;
  startDate: string | null;
  dueDate: string | null;
  updatedUser: UserResponse;
};

export type StatusResponse = {
  id: number;
  projectId: number;
  name: string;
  color: string;
  displayOrder: number;
};
