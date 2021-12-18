import { DiscordClient } from "./utils/berdbot-client";
try {
  DiscordClient();
} catch (error) {
  console.log(error.message);
}
