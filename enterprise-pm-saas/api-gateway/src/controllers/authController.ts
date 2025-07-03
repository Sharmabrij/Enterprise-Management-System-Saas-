import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const token = await authService.login(username, password);
  if (token) {
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await authService.register(username, password);
  res.json({ user });
};

export type {}; 