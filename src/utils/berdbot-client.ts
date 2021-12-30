import { DeployCommands } from "./deploy-commands";
import { BerdLog } from "./log";

require("dotenv").config();
const { Client, Collection, Intents } = require("discord.js");
const client = new Client({
  partials: ["CHANNEL"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

// MUSIC PLAYER SECTION
const { Player } = require("discord-player");
export const player = new Player(client);
client.player = player;

player.on("trackStart", (queue, track) =>
  queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`),
);

export const DiscordClient = () => {
  // Register Discord commands dynamically
  DeployCommands();
  // Load up the commands into the client
  const fs = require("fs");
  client.commands = new Collection();
  const commandFiles = fs
    .readdirSync("./src/commands")
    .filter((file) => file.endsWith(".ts"));
  console.log("FILES: ", commandFiles);
  for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
  }

  client.once("ready", () => {
    client.user.setActivity("/ commands!", {
      type: "LISTENING",
    });
    console.log("[BerdBot] - Ready!");
  });

  // client.on("messageCreate", (message) => {
  //   console.log("MSG: ", message);
  // });

  // Interactions are the new method to run commands for the Discord bot
  client.on("interactionCreate", async (interaction) => {
    try {
      // If interaction is not a command then do nothing
      if (!interaction.isCommand()) return;

      // Assign command initiated by interaction
      const command = client.commands.get(interaction.commandName);

      // If the command does not exist/has issues then return
      if (!command) return;

      // Await command execution for the specified interaction
      await command.execute(interaction);
      BerdLog(interaction);
      // BerdLog(interaction);
    } catch (error) {
      // Logs out appropriate errors in running commands
      console.error(error);
      // Gives a personal reply that mentions error in performing the desired command
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });

  client.login(process.env.DISCORD_TOKEN);
};
