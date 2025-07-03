import { Router } from 'express';
import * as projectController from '../controllers/projectController';
const router = Router();

// GET /api/projects
router.get('/', projectController.getProjects);

// POST /api/projects
router.post('/', projectController.createProject);

// PUT /api/projects/:id
router.put('/:id', projectController.updateProject);

// DELETE /api/projects/:id
router.delete('/:id', projectController.deleteProject);

export default router; 