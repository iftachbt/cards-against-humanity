import express from "express";
import passport from "passport";
import { NotFoundError } from "../../error_handling/error.class.js";

export const UsersRoute = express.Router();
export const UserPrefix = "/user";

UsersRoute.get("/user", (req, res) => {
  res.send(req.user);
});

UsersRoute.post("/signUp", passport.authenticate("signup"), (req, res, next) => {
  if (req.user.id === "ER_DUP_ENTRY") return res.send({ errMsg: "email all ready in use" });
  res.send({ id: req.user.id, userName: req.body.userName, email: req.body.email });
});

UsersRoute.post("/logIn", passport.authenticate("login"), (req, res) => {
  if (req.user.id === "incorrect password" || req.user.id === "incorrect email")
    return res.send({ errMsg: req.user.id });
  res.send({ id: req.user.id, userName: req.user.userName, email: req.body.email });
});

UsersRoute.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      res.status(500).send({ msg: "error while logged out" });
    }
    res.status(200).send({ msg: "logged out" });
  });
});
