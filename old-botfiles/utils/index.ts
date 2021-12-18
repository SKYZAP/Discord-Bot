import { ConnectionOptions, createConnection } from "typeorm";

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

export const createDb = async () => {
  await createConnection(<ConnectionOptions>{
    type: "postgres",
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    logging: false,
    ssl: true,
    url: process.env.DATABASE_URL,
    entities: [__dirname + "/../src/models/*.ts"],
    migrations: [__dirname + "/../src/migration/*.ts"],
  })
    .then(() => {
      log("[Berdbot] - Connection created", "yellow");
    })
    .catch((error) => log("[BerdBot] - " + error.message, "red"));
};
