export const ChannelCheck = async (interaction) => {
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
    interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
  )
    return await interaction.reply({
      content: "You are not in my voice channel!",
      ephemeral: true,
    });
};
