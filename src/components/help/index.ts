export const helpCommand = (discordBot, message, args) => {
  const Discord = require("discord.js");
  const helpMessage =
    `**Available commands:**\n` +
    `\n [**Misc:tools:**]` +
    "\n``/penis``" +
    `[(i)](${message.url} "Used as /penis or /penis @User"),` +
    "``/slap``" +
    `[(i)](${message.url} "Used as /slap or /slap @User"),` +
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
    "``/resume``\n" +
    `\n [**Filter:microphone2:**]` +
    "\n``/filter [filtername] [true/false]``" +
    `[(i)](${message.url} "Available filters:\nbassboost,\nnightcore,\nvibrato,\n8d,\nvaporwave,\nphaser,\ntremolo,\nreverse,\ntreble,\nnormalizer,\nsurrounding,\npulsator,\nsubboost,\nkaraoke,\nflanger,\ngate,\nhaas,\nmcompand"),` +
    "``/reset``" +
    `[(i)](${message.url} "Used to reset all filters")` +
    "\n\n[**Meme:robot:**]\n" +
    "``/bonk``," +
    "``/cmm``," +
    "``/ohno``," +
    "``/opinion``," +
    "``/jail``," +
    "``/hitler``," +
    "``/animetiddies``" +
    `[(i)](${message.url} "Used for big badonkadonks, really huge honkabadukas, absolutely massive badinkadoinkaronies")`;
  const tooltipEmbed = new Discord.MessageEmbed()
    .setColor("#4287f5")
    .setTitle("**BerdBot Commands**")
    .setDescription(`${helpMessage}`);

  message.channel.send(tooltipEmbed);
};