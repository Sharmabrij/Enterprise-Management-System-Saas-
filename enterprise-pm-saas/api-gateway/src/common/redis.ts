import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

export const connectRedis = async () => {
  try {
    await client.connect();
    console.log('✅ Connected to Redis');
  } catch (error) {
    console.error('❌ Redis connection failed:', error);
    // Don't exit process for Redis failure - it's optional
  }
};

export const getRedisClient = () => client;

export const setCache = async (key: string, value: any, ttl?: number) => {
  try {
    const serialized = JSON.stringify(value);
    if (ttl) {
      await client.setEx(key, ttl, serialized);
    } else {
      await client.set(key, serialized);
    }
  } catch (error) {
    console.error('Redis set error:', error);
  }
};

export const getCache = async (key: string) => {
  try {
    const value = await client.get(key);
    return value ? JSON.parse(value.toString()) : null;
  } catch (error) {
    console.error('Redis get error:', error);
    return null;
  }
};

export const closeRedis = () => client.quit(); 