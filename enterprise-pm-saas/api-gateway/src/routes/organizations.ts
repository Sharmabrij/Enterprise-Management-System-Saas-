import { Router } from 'express';
import * as orgController from '../controllers/organizationController';
const router = Router();

// GET /api/organizations
router.get('/', orgController.getOrganizations);

// POST /api/organizations
router.post('/', orgController.createOrganization);

// PUT /api/organizations/:id
router.put('/:id', orgController.updateOrganization);

// DELETE /api/organizations/:id
router.delete('/:id', orgController.deleteOrganization);

export default router; 