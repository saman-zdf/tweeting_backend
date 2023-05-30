import * as bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const genSalt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, genSalt);

  return hashPass;
};
