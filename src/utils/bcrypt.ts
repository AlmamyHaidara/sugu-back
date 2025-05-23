import * as bcrypt from 'bcryptjs';
const saltOrRounds = 10;
export const hash = async (password: string) =>
  await bcrypt.hash(password, await bcrypt.genSalt());

export const compare = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash);
