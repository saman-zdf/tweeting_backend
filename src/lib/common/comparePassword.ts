import * as bcrypt from 'bcrypt';

export const comparePassword = async (password: string, encryptedPassword: string): Promise<boolean> => {
  const isPasswordValid = await bcrypt.compare(password, encryptedPassword);

  return isPasswordValid;
};
