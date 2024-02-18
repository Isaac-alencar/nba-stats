import { Hono } from "hono";
import { gameController } from "~/controllers/games_controller";

const games = new Hono();

games.get("/:date", async (c) => await gameController(c));

export default games;
