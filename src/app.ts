import { DiscordClient } from "./utils/berdbot-client";
import { dbConnect } from "./utils/db-connect";
try {
  DiscordClient();
  dbConnect();
} catch (error) {
  console.log(error.message);
}
