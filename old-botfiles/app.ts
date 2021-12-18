const { DiscordClient } = require("./index");
import "reflect-metadata";
import { createDb } from "./utils";

try {
  DiscordClient();
  createDb();
} catch (error) {
  console.log(error);
}
