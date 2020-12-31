export const helpCommand = (discordBot, message, args) => {
  const Discord = require("discord.js");
  const helpMessage =
    `**Available commands:**\n` +
    `\n [**Misc:tools:**]` +
    "\n``/penis``" +
    `[(i)](${message.url} "Used as /penis or /penis @User"),` +
    "``/ping``" +
    `[(i)](${message.url} "Used as /ping")\n` +
    `\n [**Music:musical_note:**]` +
    "\n``/play``," +
    "``/remove``," +
    "``/queue``," +
    "``/clearq``," +
    "``/destroy``," +
    "``/skip``," +
    "``/pause``," +
    "``/resume``\n";
  const tooltipEmbed = new Discord.MessageEmbed()
    .setColor("#4287f5")
    .setTitle("**BerdBot Commands**")
    .setDescription(`${helpMessage}`);

  message.channel.send(tooltipEmbed);
};
