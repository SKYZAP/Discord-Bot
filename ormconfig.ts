module.exports = {
  type: "postgres",
  host: "ec2-54-156-73-147.compute-1.amazonaws.com",
  port: 5432,
  username: "juulcplyczjkyj",
  password: "79810764ded614f6ece0f01778314acf075923a46454ca9659d345cfd4d81ada",
  database: "d2t507ca37r1tp",
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
};
