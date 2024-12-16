import { hash, compare } from 'bcryptjs';

export const createHash = async (value: string) => hash(value, 10);
export const verifyHash = async (hash: string, value: string) => {
  try {
    const isValid = await compare(value, hash);
    return isValid;
  } catch (error: unknown) {
    console.log(error);
    return false;
  }
};
