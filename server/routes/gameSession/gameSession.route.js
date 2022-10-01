import express from "express";
import { createSession, fetchPlayerCards, fetchSession } from "./gameSession.service.js";

export const GameSessionRoute = express.Router();
export const GameSessionPrefix = "/game";

GameSessionRoute.post("/session", async (req, res) => {
  const result = await createSession(req.user.id);
  res.send(result);
});
GameSessionRoute.put("/session", (req, res) => {});
GameSessionRoute.get("/session", async (req, res) => {
  const session = await fetchSession(req.query.code);
  res.send(session);
});
GameSessionRoute.get("/session/player/cards", async (req, res) => {
  const session = await fetchPlayerCards(req.query.code, req.user.id);
  res.send(session);
});
