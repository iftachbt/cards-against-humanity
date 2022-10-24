import express from "express";
import { getSessionBlackCard } from "./gameSession.reposetory.js";
import { createSession, drawCard, fetchBlackCard, fetchPlayerCards, fetchSession } from "./gameSession.service.js";

export const GameSessionRoute = express.Router();
export const GameSessionPrefix = "/game";

GameSessionRoute.post("/session", async (req, res) => {
  const result = await createSession(req.user.id);
  res.send(result);
});
GameSessionRoute.put("/session", (req, res) => {});

GameSessionRoute.get("/session", async (req, res) => {
  const cards = await fetchPlayerCards(req.query.code, req.user.id);
  const { session, playersList, playerStatus } = await fetchSession(req.query.code);
  const blackCard = await fetchBlackCard(req.query.code);
  res.send({ session, cards, blackCard, playersList, playerStatus });
});
GameSessionRoute.get("/session/cards", async (req, res) => {
  const { sessionCode, color } = req.query.body;
  const newCard = await drawCard(sessionCode, color);
  res.send(newCard);
});
