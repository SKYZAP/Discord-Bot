const insert = (id, length) => {
  const Database = require("better-sqlite3");
  const db = new Database("main.db", { verbose: console.log });
  db.exec(`INSERT INTO users (id, length) VALUES (${id},${length})`);
};

export const initDb = () => {
  console.log("STARTING DB");
  const Database = require("better-sqlite3");
  const db = new Database("main.db", { verbose: console.log });
  db.exec("CREATE TABLE users(id INTEGER PRIMARY KEY, length INTEGER)");

  insert(0, 12);

  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  const user = stmt.get(`0`);
  console.log("USER ID =", user);
};

export const clearDb = (tableName) => {
  console.log("DELETING DB");
  const Database = require("better-sqlite3");
  const db = new Database("main.db", { verbose: console.log });
  db.exec(`DROP TABLE ${tableName}`);
};

// const insertMany = db.transaction((cats) => {
//   for (const cat of cats) insert.run(cat);
// });
