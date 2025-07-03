type Organization = { id: string; name: string };
const organizations: Organization[] = [];

export const getAllOrganizations = async () => organizations;

export const createOrganization = async (data: { name: string }) => {
  const org = { id: (organizations.length + 1).toString(), name: data.name };
  organizations.push(org);
  return org;
};

export const updateOrganization = async (id: string, data: { name: string }) => {
  const org = organizations.find(o => o.id === id);
  if (org) org.name = data.name;
  return org;
};

export const deleteOrganization = async (id: string) => {
  const idx = organizations.findIndex(o => o.id === id);
  if (idx !== -1) organizations.splice(idx, 1);
};

export type {}; 