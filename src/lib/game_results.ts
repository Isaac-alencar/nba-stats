import puppeteer, { Browser } from "puppeteer";
import { browser } from "~/services/puppteer";

type GameResultsProps = {
  browser: Browser;
};

const makeFetchFunction =
  ({ browser }: GameResultsProps) =>
  async (date: string) => {
    const page = await browser.newPage();

    await page.goto(`https://www.nba.com/games?date=${date}`, {
      waitUntil: "domcontentloaded",
    });

    await page.waitForSelector('[class*="GameCardMatchup_wrapper"]');

    const teamsInfo = await page.evaluate(() => {
      const gameCards = Array.from(
        document.querySelectorAll('[class*="GameCardMatchup_wrapper"]')
      );

      const matchupScores = gameCards.map((game) => {
        const scores = game.querySelectorAll('[class*="MatchupCardScore_p"]');

        return {
          home: scores.item(0).textContent,
          away: scores.item(1).textContent,
        };
      });

      const machups = gameCards.map((game) => {
        const teams = game.querySelectorAll(
          '[class*="GameCardMatchup_article"'
        );

        return {
          away: teams.item(0),
          home: teams.item(1),
        };
      });

      const gameInfo = machups.map((matchup, index) => {
        const awayTeamName = matchup.away.querySelector(
          'span[class*="MatchupCardTeamName_teamName"]'
        )?.textContent;

        const awayTeamScore = matchupScores[index].away;

        const awayTeamLogo = matchup.away
          .querySelector('[class*="TeamLogo_logo__"]')
          ?.getAttribute("src");

        const homeTeamName = matchup.home.querySelector(
          'span[class*="MatchupCardTeamName_teamName"]'
        )?.textContent;

        const homeTeamScore = matchupScores[index].home;

        const homeTeamLogo = matchup.home
          .querySelector('[class*="TeamLogo_logo__"]')
          ?.getAttribute("src");

        return {
          game: {
            home: {
              homeTeamName,
              homeTeamScore,
              homeTeamLogo,
            },
            away: {
              awayTeamName,
              awayTeamScore,
              awayTeamLogo,
            },
          },
        };
      });

      return gameInfo;
    });

    await browser.close();

    return teamsInfo;
  };

const fetchFunction = makeFetchFunction({ browser });

export { fetchFunction as fetchGamesResults };
