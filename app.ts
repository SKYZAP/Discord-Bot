import DiscordBotApp from "./index";
import "reflect-metadata";
import { createDb } from "./utils";

try {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  DiscordBotApp();
  createDb();
} catch (error) {
  console.log(error);
}
