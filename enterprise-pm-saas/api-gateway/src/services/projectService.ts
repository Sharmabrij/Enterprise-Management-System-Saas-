type Project = { id: string; name: string; organizationId?: string };
const projects: Project[] = [];

export const getAllProjects = async () => projects;

export const createProject = async (data: { name: string; organizationId?: string }) => {
  const project = { id: (projects.length + 1).toString(), name: data.name, organizationId: data.organizationId };
  projects.push(project);
  return project;
};

export const updateProject = async (id: string, data: { name: string }) => {
  const project = projects.find(p => p.id === id);
  if (project) project.name = data.name;
  return project;
};

export const deleteProject = async (id: string) => {
  const idx = projects.findIndex(p => p.id === id);
  if (idx !== -1) projects.splice(idx, 1);
};

export type {}; 