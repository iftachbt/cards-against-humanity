import express from "express";
import passport from "passport";

export const UsersRoute = express.Router();
export const UserPrefix = "/user";

UsersRoute.get("/user", (req, res) => {
  res.send(req.user);
});
UsersRoute.post("/signUp", passport.authenticate("signup"), (req, res, next) =>
  signUp(req, res).catch((err) => next(err))
);

UsersRoute.post("/logIn", passport.authenticate("login"), (req, res, next) =>
  logIn(req, res).catch((err) => next(err))
);

UsersRoute.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      res.status(500).send({ msg: "error while logged out" });
    }
    res.status(200).send({ msg: "logged out" });
  });
});
const signUp = async (req, res) => {
  if (req.user.id === "ER_DUP_ENTRY") return res.send({ errMsg: "email all ready in use" });
  res.send({ id: req.user.id, userName: req.body.userName, email: req.body.email });
};
const logIn = async (req, res) => {
  if (req.user.id === "ER_DUP_ENTRY") return res.send({ errMsg: "email all ready in use" });
  res.send({ id: req.user.id, userName: req.body.userName, email: req.body.email });
};
