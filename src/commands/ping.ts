const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!")
    .addStringOption((option) =>
      option
        .setName("pingtext")
        .setDescription("Sample text")
        .setRequired(true),
    ),
  async execute(interaction) {
    const stringt = interaction.options.getString("pingtext");
    console.log(stringt);
    await interaction.reply(`TEXTS: ${stringt}`);
  },
};
