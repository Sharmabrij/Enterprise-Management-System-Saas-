import { Request, Response } from 'express';
import * as orgService from '../services/organizationService';

export const getOrganizations = async (req: Request, res: Response) => {
  const orgs = await orgService.getAllOrganizations();
  res.json(orgs);
};

export const createOrganization = async (req: Request, res: Response) => {
  const org = await orgService.createOrganization(req.body);
  res.json(org);
};

export const updateOrganization = async (req: Request, res: Response) => {
  const org = await orgService.updateOrganization(req.params.id, req.body);
  res.json(org);
};

export const deleteOrganization = async (req: Request, res: Response) => {
  await orgService.deleteOrganization(req.params.id);
  res.json({ message: 'Organization deleted' });
}; 