import jwt from 'jsonwebtoken';
const users: { username: string; password: string }[] = [];
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const login = async (username: string, password: string) => {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return null;
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
};

export const register = async (username: string, password: string) => {
  users.push({ username, password });
  return { username };
};

export type {}; 