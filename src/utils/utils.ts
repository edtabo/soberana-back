import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const setPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const pass = await bcrypt.hash(password, saltRounds);
  return pass;
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = async ({ id, name, last_name, role }: { id: number, name: string, last_name: string, role: number; }): Promise<string> => {
  const token = jwt.sign({ id, name, last_name, role }, process.env.JWT_SECRET!!, {
    expiresIn: '1h',
  });
  return token;
};