import { it, expect, describe, beforeAll, beforeEach, afterEach, afterAll } from "vitest";
import { GameSession } from "../../mongoDB/DB.js";
import { create } from "../../routes/gameSessions/session.service.js";
import { gameSessionCreationValidation } from "../../routes/gameSessions/session.validation.js";
import { dbMockInit, randomString, randomNumber } from "../utils.js";

dbMockInit(beforeAll, beforeEach, afterEach, afterAll);
afterEach(async () => {
  await GameSession.deleteMany({});
});

describe("create gameSession tests", async () => {
  it("should create new gameSession", async () => {
    const characterId = randomString();
    const name = randomString();
    const ATK = randomNumber();
    const shield = randomNumber();
    const difficulty = "meduim";
    const HP = randomNumber();
    const gold = randomNumber();
    const level = randomNumber();
    const kills = randomNumber();
    const deaths = randomNumber();

    await create({ name, ATK, shield, HP, gold, level, kills, deaths, difficulty, characterId });

    const session = await GameSession.find({});

    expect(session[0]).toBeDefined();
    expect(session[0].id).toBeDefined();
    expect(session[0].name).toBe(name);
    expect(session[0].characterId).toBe(characterId);
    expect(session[0].ATK).toBe(ATK);
    expect(session[0].shield).toBe(shield);
    expect(session[0].HP).toBe(HP);
    expect(session[0].gold).toBe(gold);
    expect(session[0].level).toBe(level);
    expect(session[0].kills).toBe(kills);
    expect(session[0].deaths).toBe(deaths);
  });

  it("should fail on name  not exist", async () => {
    const res = null;
    const req = {
      body: {
        difficulty: "meduim",
        characterId: randomString(),
        ATK: randomNumber(),
        shield: randomNumber(),
        HP: randomNumber(),
        gold: randomNumber(),
        level: randomNumber(),
        kills: randomNumber(),
        deaths: randomNumber(),
      },
    };

    gameSessionCreationValidation(req, res, (err) => {
      expect(err.message).toBe("name is require");
    });
  });
});
