export const DeployCommands = () => {
  try {
    require("dotenv").config();
    let i = 0;
    const fs = require("fs");
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v9");

    const commands = [];
    const commandFiles = fs
      .readdirSync("src/commands")
      .filter((file) => file.endsWith(".ts"));

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

    rest
      .put(Routes.applicationCommands(process.env.DISCORD_CLIENTID), {
        body: commands,
      })
      .then((reg) => {
        while (i < commands.length) {
          console.log(
            `Successfully registered ${reg[i].name} application commands.`,
          );
          i += 1;
        }
      })
      .catch(console.error);
  } catch (error) {
    console.log(error);
  }
};
