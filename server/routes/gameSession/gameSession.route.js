import express from "express";
import { createSession, fetchSession } from "./gameSession.service.js";

export const GameSessionRoute = express.Router();
export const GameSessionPrefix = "/game";

GameSessionRoute.post("/session", async (req, res) => {
  const result = await createSession(req.user.id, req.body.name);
  res.send(result);
});
GameSessionRoute.put("/session", (req, res) => {});
GameSessionRoute.get("/session", async (req, res) => {
  const result = await fetchSession(req.query.code);
  console.log("result", result);
  res.send(result);
});
