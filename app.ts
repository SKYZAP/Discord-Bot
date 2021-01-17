import DiscordBotApp from "./index";
import "reflect-metadata";
import { createDb } from "./utils";

try {
  DiscordBotApp();
  createDb();
} catch (error) {
  console.log(error);
}
