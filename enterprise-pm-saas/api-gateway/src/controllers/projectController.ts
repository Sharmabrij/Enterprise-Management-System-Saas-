import { Request, Response } from 'express';
import * as projectService from '../services/projectService';

export const getProjects = async (req: Request, res: Response) => {
  const projects = await projectService.getAllProjects();
  res.json(projects);
};

export const createProject = async (req: Request, res: Response) => {
  const project = await projectService.createProject(req.body);
  res.json(project);
};

export const updateProject = async (req: Request, res: Response) => {
  const project = await projectService.updateProject(req.params.id, req.body);
  res.json(project);
};

export const deleteProject = async (req: Request, res: Response) => {
  await projectService.deleteProject(req.params.id);
  res.json({ message: 'Project deleted' });
};

export type {}; 