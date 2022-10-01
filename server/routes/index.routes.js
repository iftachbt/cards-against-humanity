import { UsersRoute, UserPrefix } from "./users/users.route.js";
import { errorMid } from "../error_handling/error.handling.js";
import { GameSessionPrefix, GameSessionRoute } from "./gameSession/gameSession.route.js";

export const connectRoutes = (app) => {
  app.use(UserPrefix, UsersRoute);
  app.use(GameSessionPrefix, GameSessionRoute);
  app.use(errorMid);
};
