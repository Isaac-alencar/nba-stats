import { Hono } from "hono";
import { logger } from "hono/logger";
import games from "./routes/games";

const app = new Hono();

app.use(logger());

app.route("/games", games);

export default app;
