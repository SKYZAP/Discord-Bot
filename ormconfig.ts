module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: false,
  ssl: true,
  url: process.env.DATABASE_URL,
  entities: [__dirname + "/src/models/*.ts"],
  migrations: [__dirname + "/src/migration/*.ts"],
};
