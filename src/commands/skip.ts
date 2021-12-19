import { SlashCommandBuilder } from "@discordjs/builders";
import { player } from "../utils/berdbot-client";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("SKIP MOOSIX")
    .addStringOption((option) =>
      option
        .setName("pos")
        .setDescription("Enter queue position to skip")
        .setRequired(false)
    ),
  async execute(interaction) {
    try {
      // TODO: Ship this off to util
      if (!interaction.guild.me.voice.channelId) {
        return await interaction.reply({
          content: "I'm not even in the voice channel!",
          ephemeral: true,
        });
      }
      if (!interaction.member.voice.channelId)
        return await interaction.reply({
          content: "You are not in a voice channel!",
          ephemeral: true,
        });
      if (
        interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
      )
        return await interaction.reply({
          content: "You are not in my voice channel!",
          ephemeral: true,
        });
      // TODO: Up until here <<<

      // Actual /skip function
      const queue = await player.getQueue(interaction.guildId);
      if (!queue) {
        return await interaction.reply({
          content: "❌ | The queue is not found!",
          ephemeral: true,
        });
      }

      const npTrack = await queue.nowPlaying();

      if (queue.tracks.length > 0) {
        await queue.skip();
      } else {
        await queue.destroy(true);
      }

      return await interaction.reply({
        content: `⏩ | ${
          npTrack ? `Track **${npTrack}` : "**Current track"
        }** has been skipped!`,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
