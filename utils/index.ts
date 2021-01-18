import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from "typeorm";
const { parse } = require("pg-connection-string");
// require("dotenv").config();

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

const getOptions = async () => {
  let connectionOptions: ConnectionOptions;
  connectionOptions = {
    type: "postgres",
    synchronize: false,
    logging: true,
    extra: {
      ssl: true,
    },
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [__dirname + "/../src/models/*.ts"],
  };
  if (process.env.DATABASE_URL) {
    Object.assign(connectionOptions, { url: parse(process.env.DATABASE_URL) });
  } else {
    connectionOptions = await getConnectionOptions();
  }

  return connectionOptions;
};

export const createDb = async () => {
  const typeormconfig = await getOptions();
  await createConnection(typeormconfig)
    .then(() => {
      log("[Berdbot] - Connection created", "yellow");
    })
    .catch((error) => log("[BerdBot] - " + error.message, "red"));
};
