import bcrypt from "bcrypt";

export const hash = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
