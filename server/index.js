import "dotenv/config";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import { passportInitialize } from "./routes/users/users.auth.js";
import { connectRoutes } from "./routes/index.routes.js";
import { sessionConfig } from "./routes/users/users.auth.js";
import { corsOptions } from "./cors.service.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

passportInitialize(passport);
app.use(express.static("public"));
app.use(cookieParser(process.env.AUTH_SESSION_SECRET));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(sessionConfig()));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.ENV === "PROD") {
  console.log("PROD");
  app.use(express.static(path.join(__dirname, "client", "build")));
}
const port = process.env.PORT || 4000;

connectRoutes(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
