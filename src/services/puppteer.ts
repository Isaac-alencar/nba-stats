import puppeteer from "puppeteer";

export const browser = await puppeteer.launch({
  headless: true,
  defaultViewport: null,
});
