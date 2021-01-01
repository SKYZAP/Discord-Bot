import DiscordBotApp from "./index";
import { log } from "./utils";

const liveCheck = () => {
  log("[BerdBot] - Funtional", "grey");
};

try {
  const express = require("express");
  const app = express();

  app.listen(process.env.PORT || 5000);
  setInterval(liveCheck, 50000);
  DiscordBotApp();
} catch (error) {
  console.log(error);
}
