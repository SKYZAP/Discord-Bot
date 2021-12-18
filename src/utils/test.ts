// const command = require("../commands/ping.ts");
// console.log(command);
// const command2 = require("../commands/play.ts");
// console.log(command2);

import { player } from "./berdbot-client";

// const fs = require("fs");
// const commands = [];
// const commandFiles = fs
//   .readdirSync("src/commands")
//   .filter((file) => file.endsWith(".ts"));

// console.log("COMMAND FILES: ", commandFiles);
// console.log("DIRECTORY: ", __dirname);

// for (const file of commandFiles) {
//   console.log("FILE OG:", file);
//   const fileName = file.slice(0, -3);
//   // console.log("FILE NAME:", fileName);
//   const fileLocation = "../commands/" + fileName;
//   console.log("FILE LOC: ", fileLocation);
//   const command = require(fileLocation);
//   commands.push(command.data.toJSON());
// }

console.log(player);
