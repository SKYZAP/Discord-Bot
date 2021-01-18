import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from "typeorm";

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

// export const options: ConnectionOptions = {
//   type: "postgres",
//   host: process.env.DATABASE_URL,
//   port: parseInt(process.env.DB_PORT),
//   username: process.env.DB_HOST ?? process.env.DB_USER,
//   password: process.env.DB_HOST ?? process.env.DB_PASSWORD,
//   database: process.env.DB_HOST ?? process.env.DB_NAME,
//   entities: [__dirname + "/../src/models/*.ts"],
//   synchronize: true,
//   logging: true,
//   ssl: {
//     rejectUnauthorized: false,
//   },
//   extra: {
//     ssl: true,
//   },
// };

const getOptions = async () => {
  let connectionOptions: ConnectionOptions;
  connectionOptions = {
    type: "postgres",
    synchronize: false,
    logging: true,

    entities: [__dirname + "/../src/models/*.ts"],
  };
  if (process.env.DATABASE_URL) {
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
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
