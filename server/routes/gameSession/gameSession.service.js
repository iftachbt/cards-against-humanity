import randomize from "randomatic";
import { getSessionByCode, insert } from "./gameSession.reposetory.js";
import { v4 as uuid } from "uuid";

export const createSession = async (...info) => {
  const id = uuid();
  const code = randomize("0", 6);
  const res = await insert([...info, code, id]);
  return code;
};
export const fetchSession = (info) => getSessionByCode(info);
