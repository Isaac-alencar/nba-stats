import type { Context } from "hono";
import { nbaGameResults } from "~/use_cases/nba_game_results";

export async function gameController(c: Context) {
  const { date } = c.req.param();

  const res = await nbaGameResults(date);

  return c.json({ data: res });
}
