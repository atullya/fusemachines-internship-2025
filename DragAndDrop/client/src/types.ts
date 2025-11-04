export const STAGE_LIST = [
  { id: "preliminary", title: "Preliminary Interview" },
  { id: "technical", title: "Technical Interview" },
  { id: "additional", title: "Additional Interview" },
  { id: "client", title: "Client Interview" },
  { id: "selection", title: "Selection Interview" },
] as const;

export type StageId = (typeof STAGE_LIST)[number]["id"];

export interface Candidate {
  _id: string;
  name: string;
  roleTitle: string;
  stage: StageId;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type Board = Record<StageId, Candidate[]>;
