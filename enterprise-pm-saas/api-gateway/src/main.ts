/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// Import middleware
import { requestLogger } from './middleware/request-logger';
import { errorHandler } from './middleware/error-handler';
import { authMiddleware } from './middleware/auth';
import { tenantMiddleware } from './middleware/tenant';
import { validationMiddleware } from './middleware/validation';

// Import routes
import healthRoutes from './routes/health';
import authRoutes from './routes/auth';
import integrationsRoutes from './routes/integrations';
import organizationsRoutes from './routes/organizations';
import projectsRoutes from './routes/projects';
import usersRoutes from './routes/users';

// Import common utilities
import { connectDatabase } from './common/database';
import { connectRedis } from './common/redis';
import { setupGracefulShutdown } from './common/graceful-shutdown';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(requestLogger);
app.use(authMiddleware);
app.use(tenantMiddleware);
app.use(validationMiddleware);
app.use(cors());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Static assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/integrations', integrationsRoutes);
app.use('/api/organizations', organizationsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/users', usersRoutes);

// Error handler (should be last)
app.use(errorHandler);

const port = process.env.PORT || 3333;

const startServer = async () => {
  try {
    // Connect to database and Redis
    await connectDatabase();
    await connectRedis();

    const server = app.listen(port, () => {
      console.log(`✅ Server listening at http://localhost:${port}/api`);
    });

    // Setup graceful shutdown
    setupGracefulShutdown(server);

    server.on('error', console.error);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
