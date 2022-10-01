import { sendGet, sendPost, sendDelete, sendUpdate } from "../apiHandle";

export async function fetchSessionByCode(code) {
  return await sendGet("game/session?code=" + code);
}

export async function createSession(info) {
  return await sendPost("game/session", info);
}
export async function deleteSession(characterId) {
  return await sendDelete("game/session?characterId=" + characterId);
}
export async function updateSession(info) {
  return await sendUpdate("game/session", info);
}
