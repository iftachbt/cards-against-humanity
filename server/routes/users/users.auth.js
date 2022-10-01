import "dotenv/config";
import LocalStrategy from "passport-local";
import { sessionStore } from "../../mongoDB/DB.js";
import { UnAuthriseError } from "../../error_handling/error.class.js";
import bcrypt from "bcrypt";
import { getPassByEmail, getUserByEmail, getUserById, insert } from "../users/users.reposetory.js";
import { v4 as uuid } from "uuid";

const MyLocalStrategy = LocalStrategy.Strategy;
const saltRounds = 10;

const bcryptHandler = (password) => {
  return new Promise((resolve) =>
    bcrypt.hash(password, saltRounds, (err, hash) => {
      resolve(hash);
    })
  );
};

export function sessionConfig() {
  return {
    key: process.env.AUTH_SESSION_KEY,
    secret: process.env.AUTH_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  };
}
export const passportInitialize = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const res = await getUserById(id);
    if (!res[0]) return done(null, false);
    return done(null, res[0]);
  });

  passport.use(
    "signup",
    new MyLocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async function (req, email, password, done) {
        const id = uuid();
        const res = await insert([email, req.body.userName, await bcryptHandler(password), id]);
        if (res !== "ER_DUP_ENTRY") return done(null, { id: id });
        return done(null, { id: "ER_DUP_ENTRY" });
      }
    )
  );

  passport.use(
    "login",
    new MyLocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async function (req, email, password, done) {
        let hash = await getPassByEmail(email);
        if (!hash.length) return done(null, { id: "incorrect email" });
        bcrypt.compare(password, hash[0].password, async function (err, result) {
          if (result) {
            const user = await getUserByEmail(email);
            return done(null, { id: user[0].id, userName: user[0].userName });
          }
          return done(null, { id: "incorrect password" });
        });
      }
    )
  );
  return passport;
};
