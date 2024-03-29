export const DeleteCommands = () => {
  try {
    require("dotenv").config();
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v9");

    const token = process.env.DISCORD_TOKEN;
    const clientId = process.env.DISCORD_CLIENTID;
    const guildId = process.env.DISCORD_GUILDID;

    const rest = new REST({ version: "9" }).setToken(token);

    if (process.env.DB_ENVIRONMENT) {
      rest
        .get(Routes.applicationCommands(clientId))
        .then((data) => {
          const promises = [];
          for (const command of data) {
            const deleteUrl = `${Routes.applicationCommands(clientId)}/${
              command.id
            }`;
            promises.push(rest.delete(deleteUrl));
          }
          return Promise.all(promises);
        })
        .then(console.log("[BerdBot] - Deleting all application commands"));
    } else {
      rest
        .get(Routes.applicationGuildCommands(clientId, guildId))
        .then(async (data) => {
          const promises = [];
          for (const command of data) {
            const deleteUrl = `${Routes.applicationGuildCommands(
              clientId,
              guildId,
            )}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
          }
          return await Promise.all(promises);
        })
        .then(console.log("[BerdBot] - Deleting all guild commands"));
    }
  } catch (error) {
    console.log(error.message);
  }
};

DeleteCommands();
