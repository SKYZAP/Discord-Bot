export const DeployCommands = () => {
  try {
    require("dotenv").config();
    let i = 0;
    const fs = require("fs");
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v9");
    const { _ } = require("lodash");

    const commands = [];
    const commandFiles = fs
      .readdirSync("src/commands")
      .filter((file) => file.endsWith(".ts"));

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);
    // Register global commands
    if (process.env.DB_ENVIRONMENT) {
      rest
        .put(Routes.applicationCommands(process.env.DISCORD_CLIENTID), {
          body: commands,
        })
        .then((reg) => {
          while (i < commands.length) {
            console.log(
              `Successfully registered ${reg[i].name} global command.`,
            );
            i += 1;
          }
        })
        .catch(console.error);
    }
    // Register guild commands
    let guildCommands = commands;
    guildCommands = _.map(guildCommands, (gc) => {
      return {
        ...gc,
        description: "[DEV]-" + gc.description,
      };
    });
    rest
      .put(
        Routes.applicationGuildCommands(
          process.env.DISCORD_CLIENTID,
          process.env.DISCORD_GUILDID,
        ),
        {
          body: guildCommands,
        },
      )
      .then((reg) => {
        while (i < guildCommands.length) {
          console.log(`Successfully registered ${reg[i].name} guild command.`);
          i += 1;
        }
      })
      .catch(console.error);
  } catch (error) {
    console.log(error);
  }
};
