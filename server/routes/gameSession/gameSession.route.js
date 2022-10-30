import express from "express";
import {
  createSession,
  drowCardToPlayer,
  fetchBlackCard,
  fetchPlayerCards,
  fetchSession,
} from "./gameSession.service.js";

export const GameSessionRoute = express.Router();
export const GameSessionPrefix = "/game";

GameSessionRoute.post("/session", (req, res, next) => createSessionHandler(req, res).catch((err) => next(err)));

GameSessionRoute.put("/session", (req, res, next) => {});

GameSessionRoute.get("/session", async (req, res, next) => getSessionHandler(req, res).catch((err) => next(err)));

GameSessionRoute.get("/session/cards", async (req, res, next) => getNewWhiteCard(req, res).catch((err) => next(err)));

const createSessionHandler = async (req, res) => {
  const result = await createSession(req.user.id);
  res.send(result);
};
const getSessionHandler = async (req, res) => {
  const cards = await fetchPlayerCards(req.query.code, req.user.id);
  const { session, playersList, playerStatus, playedCards, gameOver } = await fetchSession(req.query.code);
  const blackCard = await fetchBlackCard(req.query.code);
  res.send({ session, cards, blackCard, playersList, playerStatus, playedCards, gameOver });
};
const getNewWhiteCard = async (req, res) => {
  const { sessionCode } = req.query;
  try {
    const newCard = await drowCardToPlayer(sessionCode, req.user.id);
    res.send(newCard);
  } catch (err) {
    console.log(err);
  }
};
