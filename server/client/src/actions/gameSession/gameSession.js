import { sendGet, sendPost, sendDelete, sendUpdate } from "../apiHandle";

export async function fetchSessionById(characterId) {
  return await sendGet("game/session?characterId=" + characterId);
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
