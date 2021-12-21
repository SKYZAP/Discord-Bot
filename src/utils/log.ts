export const BerdLog = (interaction) => {
  console.log(
    `[BerdBot] - ${interaction.user.username} used command ${interaction.commandName} in ${interaction.guild.name}`,
  );
};
