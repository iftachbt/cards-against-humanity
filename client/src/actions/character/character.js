import { sendGet, sendPost, sendDelete, sendUpdate } from "../apiHandle";

export const fetchCharacter = async () => {
  return await sendGet("character/character");
};

export async function saveCharacter(info) {
  return await sendPost("character/character", info);
}

export async function deleteCharacter(characterId) {
  return await sendDelete("character/character?characterId=" + characterId);
}
export async function updateCharacter(info) {
  return await sendUpdate("character/character", info);
}
