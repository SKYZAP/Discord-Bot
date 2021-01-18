import { ConnectionOptions, createConnection } from "typeorm";

require("dotenv").config();

export const log = (msg, color) => {
  const chalk = require("chalk");

  if (!msg) {
    return console.log(chalk.red("Invalid/Incomplete Log"));
  }

  console.log(chalk.keyword(`${color}`)(msg));
};

export const getUserFromMention = (mention, discordBot) => {
  if (!mention) return;

  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }

    return discordBot.users.cache.get(mention);
  }
};

export const options: ConnectionOptions = {
  type: "postgres",
  host: process.env.DATABASE_URL,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_HOST,
  password: process.env.DB_HOST,
  database: process.env.DB_HOST,
  entities: [__dirname + "/../src/models/*.ts"],
  synchronize: true,
  logging: true,
};

export const createDb = async () => {
  await createConnection(options)
    .then(() => {
      log("[Berdbot] - Connection created", "yellow");
    })
    .catch((error) => log("[BerdBot] - " + error.message, "red"));
};
