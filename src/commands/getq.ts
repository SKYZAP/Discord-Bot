import { SlashCommandBuilder } from "@discordjs/builders";
import { player } from "../utils/berdbot-client";
import { ChannelCheck } from "../utils/music-player";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("q")
    .setDescription("Gets all the songs in the queue"),
  async execute(interaction) {
    try {
      // Check for voice channel
      ChannelCheck(interaction);

      // Clear function
      const queue = await player.getQueue(interaction.guildId);
      if (!queue) {
        return await interaction.reply({
          content: "❌ | The queue is not found!",
          ephemeral: true,
        });
      }
      // Check queued up songs
      if (queue.tracks.length <= 0) {
        interaction.reply({
          content: "Only 1 song is being played, queue more songs!",
          ephemeral: true,
        });
      }

      console.log("QUEUE: ", queue);

      return await interaction.reply({
        content: `:regional_indicator_x: :regional_indicator_x: :regional_indicator_x: | **IN PROGRESSSS**`,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};
