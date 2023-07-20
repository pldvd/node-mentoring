import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};
