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
const player = new Player(client);
client.player = player;

player.on("trackStart", (queue, track) =>
  queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`),
);

module.exports.player = player;

const DiscordClient = () => {
  const { token } = require("./config.json");
  const fs = require("fs");

  client.commands = new Collection();
  const commandFiles = fs
    .readdirSync("./src/commands")
    .filter((file) => file.endsWith(".ts"));

  for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
  }

  client.once("ready", () => {
    client.user.setActivity("you....", { type: "WATCHING" });
    console.log("[BerdBot] - Ready!");
  });

  // client.on("messageCreate", (message) => {
  //   console.log("MSG: ", message);
  // });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });

  client.login(token);
};

module.exports.DiscordClient = DiscordClient;

//  something related to returning reference instead of object itself
