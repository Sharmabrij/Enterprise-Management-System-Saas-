import { Pool } from 'pg';

// Debug: Print the raw DB password (remove after debugging!)
console.log('🛑 DEBUG: process.env.DB_PASSWORD =', JSON.stringify(process.env.DB_PASSWORD));

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'enterprise_pm',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Debug log (do not log password)
console.log('🔍 DB Config:', { ...dbConfig, password: '***' });

const pool = new Pool(dbConfig);

export const connectDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL database');
    client.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const getClient = () => pool.connect();

export const closeDatabase = () => pool.end(); 