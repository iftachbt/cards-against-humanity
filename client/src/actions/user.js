import { sendGet, sendPost } from "./apiHandle";

export const fetchUser = async () => {
  return await sendGet("user/user");
};

export function logIn(info) {
  return sendPost("user/logIn", info);
}

export function signUp(info) {
  return sendPost("user/signUp", info);
}

export async function logout() {
  await sendGet("user/logout");
}
