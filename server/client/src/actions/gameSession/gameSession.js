import { sendGet, sendPost, sendDelete, sendUpdate } from "../apiHandle";

export async function fetchSessionByCode(code) {
  return await sendGet("game/session?code=" + code);
}

export async function createSession(data) {
  return await sendPost("game/session", data);
}
export async function deleteSession(characterId) {
  return await sendDelete("game/session?characterId=" + characterId);
}
export async function updateSession(data) {
  return await sendUpdate("game/session", data);
}
export async function getNewCard(data) {
  return await sendGet("game/session/card?body=" + data);
}
