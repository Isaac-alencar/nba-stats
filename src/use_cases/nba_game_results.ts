import { fetchGamesResults } from "~/lib/game_results";

export const nbaGameResults = async (date: string) => {
  const res = await fetchGamesResults(date);

  return res;
};
