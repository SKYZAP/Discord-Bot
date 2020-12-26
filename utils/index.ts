export const log = (msg, color) => {
  const chalk = require("chalk");

  if (!msg) {
    return console.log(chalk.red("Invalid/Incomplete Log"));
  }

  console.log(chalk.keyword(`${color}`)(msg));
};
