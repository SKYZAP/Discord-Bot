import DiscordBotApp from "./index";

try {
  const express = require("express");
  const app = express();

  app.listen(process.env.PORT || 5000);

  DiscordBotApp();
} catch (error) {
  console.log(error);
}
