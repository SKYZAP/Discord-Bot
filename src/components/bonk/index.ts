import { getUserFromMention, log } from "../../../utils";
const Canvas = require("canvas");
const Discord = require("discord.js");

export const bonkCommand = async (discordBot, message, args) => {
  try {
    let author = message.author.displayAvatarURL({
      dynamic: false,
      format: "png",
    });
    let bonkUser;
    let bonkImg;

    if (!args) message.channel.send("Please provide a target");

    if (args[0]) {
      bonkUser = getUserFromMention(args[0], discordBot);

      if (!bonkUser) return message.reply("User not found");

      bonkImg = bonkUser.displayAvatarURL({ dynamic: false, format: "png" });
    } else {
      message.reply("Please provide a bonk target");
    }

    const bg = await Canvas.loadImage("https://i.imgur.com/roAhInZ.jpg");
    const ava = await Canvas.loadImage(author);
    const bonkAva = await Canvas.loadImage(bonkImg);

    const canvas = Canvas.createCanvas(720, 492);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(ava, 210, 115, 120, 120);
    ctx.drawImage(bonkAva, 435, 270, 120, 120);

    const image = canvas.toBuffer();
    let attachment = new Discord.MessageAttachment(image, "bonk.jpeg");
    message.channel.send(attachment);

    const channelType = message.channel.name ?? "private message";

    log(
      "[BerdBot] - " +
        message.author.username +
        " used command bonk in " +
        channelType +
        " channel",
      "lightblue"
    );
  } catch (error) {
    log(`[BerdBot] - ${error.message}`, "red");
  }
};
