import { closeDatabase } from './database';
import { closeRedis } from './redis';
import { logger } from './logger';

let isShuttingDown = false;

export const setupGracefulShutdown = (server: any) => {
  const gracefulShutdown = async (signal: string) => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    logger.info(`Received ${signal}. Starting graceful shutdown...`);

    // Stop accepting new connections
    server.close((err: any) => {
      if (err) {
        logger.error('Error during server close:', err);
        process.exit(1);
      }

      logger.info('HTTP server closed');

      // Close database connections
      closeDatabase()
        .then(() => {
          logger.info('Database connections closed');
        })
        .catch((err) => {
          logger.error('Error closing database connections:', err);
        })
        .finally(() => {
          // Close Redis connections
          closeRedis()
            .then(() => {
              logger.info('Redis connections closed');
            })
            .catch((err) => {
              logger.error('Error closing Redis connections:', err);
            })
            .finally(() => {
              logger.info('Graceful shutdown completed');
              process.exit(0);
            });
        });
    });

    // Force shutdown after 30 seconds
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 30000);
  };

  // Handle different shutdown signals
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    gracefulShutdown('uncaughtException');
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', { reason, promise });
    gracefulShutdown('unhandledRejection');
  });
}; 