export class User {
  createUser = (message, length) => {
    const Database = require("better-sqlite3");
    const db = new Database("main.db", { verbose: console.log });

    const row = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(message.author.id);

    if (!row) {
      db.exec(
        `INSERT INTO users (id, username, length) VALUES (${message.author.id},'${message.author.username}',${length})`
      );
    }

    const user = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(message.author.id);

    return user;
  };

  createUserFromMention = (id, username, length) => {
    const Database = require("better-sqlite3");
    const db = new Database("main.db", { verbose: console.log });

    const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

    if (!row) {
      db.exec(
        `INSERT INTO users (id, username, length) VALUES (${id},'${username}',${length})`
      );
    }

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

    return user;
  };

  initDb = () => {
    console.log("STARTING DB");
    const Database = require("better-sqlite3");
    const db = new Database("main.db", { verbose: console.log });
    db.exec(
      "CREATE TABLE users(id TEXT PRIMARY KEY, username TEXT, length INTEGER)"
    );
  };

  getUser = (id) => {
    const db = require("better-sqlite3")("main.db", { verbose: console.log });
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    return user;
  };

  getAllUsers = () => {
    const db = require("better-sqlite3")("main.db", { verbose: console.log });
    const users = db.prepare("SELECT * FROM users").all();
    return users;
  };

  deleteUser = (id) => {
    const db = require("better-sqlite3")("main.db", { verbose: console.log });
    const user = db.exec(`DELETE FROM users WHERE id = ${id}`);
    return user;
  };

  deleteAllUsers = () => {
    const db = require("better-sqlite3")("main.db", { verbose: console.log });
    db.exec(`DELETE FROM users`);
  };
}
