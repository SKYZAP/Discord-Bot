import { ConnectionOptions, createConnection } from "typeorm";

export const dbConnect = async () => {
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
    entities: ["../models/*.ts"],
    migrations: ["../migrations/*.ts"],
  })
    .then(() => {
      console.log("[Berdbot] - Connection established");
    })
    .catch((error) => console.log("[BerdBot] - " + error.message));
};
