import express from 'express';
import { deserializeUser } from '../middleware/deserialize-user.middleware';
import { requireUser } from '../middleware/require-user.middleware';
import { restrictTo } from '../middleware/restrict-to.middleware';
import { Role } from '../enums/role.enum';
import { validate } from '../middleware/validate.middleware';
import { createItemRequestSchema } from '../schemas/item-request.schema';
import { createItemRequestHandler, getItemRequestsHandler, getMyItemRequestsHandler } from '../controllers/item-request.controller';

const router = express.Router();

router.use(deserializeUser, requireUser);

// Create item request
router.post('/', restrictTo(Role.CITIZEN), validate(createItemRequestSchema), createItemRequestHandler);

// Get item requests
router.get('/', restrictTo(Role.ADMIN, Role.RESCUER), getItemRequestsHandler);

// Get current user's item requests
router.get('/me', restrictTo(Role.CITIZEN), getMyItemRequestsHandler);

export default router;