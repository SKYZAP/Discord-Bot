import { getUserFromMention, log } from "../../../utils";
const canvacord = require("canvacord");
const Discord = require("discord.js");
const Canvas = require("canvas");

export const triggeredCommand = async (message) => {
  try {
    let avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "png",
    });
    let image = await canvacord.Canvas.trigger(avatar);
    let attachment = new Discord.MessageAttachment(image, "triggered.gif");
    message.channel.send(attachment);
    const channelType = message.channel.name ?? "private message";
    log(
      "[BerdBot] - " +
        message.author.username +
        " used command triggered in " +
        channelType +
        " channel",
      "lightblue"
    );
  } catch (error) {
    log(`[BerdBot] - ${error.message}`, "red");
  }
};

export const facepalmCommand = async (message) => {
  try {
    let avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "png",
    });
    let image = await canvacord.Canvas.facepalm(avatar);
    let attachment = new Discord.MessageAttachment(image, "facepalm.png");
    message.channel.send(attachment);
    const channelType = message.channel.name ?? "private message";
    log(
      "[BerdBot] - " +
        message.author.username +
        " used command facepalm in " +
        channelType +
        " channel",
      "lightblue"
    );
  } catch (error) {
    log(`[BerdBot] - ${error.message}`, "red");
  }
};

export const hitlerCommand = async (message) => {
  try {
    let avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "png",
    });
    let image = await canvacord.Canvas.hitler(avatar);
    let attachment = new Discord.MessageAttachment(image, "hitler.png");
    message.channel.send(attachment);
    const channelType = message.channel.name ?? "private message";
    log(
      "[BerdBot] - " +
        message.author.username +
        " used command hitler in " +
        channelType +
        " channel",
      "lightblue"
    );
  } catch (error) {
    log(`[BerdBot] - ${error.message}`, "red");
  }
};

export const jailCommand = async (discordBot, message, args) => {
  try {
    let avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "png",
    });
    let jailUser;

    if (args[0]) {
      jailUser = getUserFromMention(args[0], discordBot);
      if (!jailUser) return message.reply("User not found");

      avatar = jailUser.displayAvatarURL({ dynamic: false, format: "png" });
    }

    let image = await canvacord.Canvas.jail(avatar, true);
    let attachment = new Discord.MessageAttachment(image, "jail.png");
    message.channel.send(attachment);
    const channelType = message.channel.name ?? "private message";
    log(
      "[BerdBot] - " +
        message.author.username +
        " used command jail in " +
        channelType +
        " channel",
      "lightblue"
    );
  } catch (error) {
    log(`[BerdBot] - ${error.message}`, "red");
  }
};

export const cmmCommand = async (message, args) => {
  try {
    const memeText = args.join(" ");
    if (memeText.length > 0) {
      let image = await canvacord.Canvas.changemymind(`${memeText}`);
      let attachment = new Discord.MessageAttachment(image, "cmm.png");
      message.channel.send(attachment);
    } else {
      message.channel.send("> Please provide text");
    }
    const channelType = message.channel.name ?? "private message";
    log(
      "[BerdBot] - " +
        message.author.username +
        " used command cmm in " +
        channelType +
        " channel",
      "lightblue"
    );
  } catch (error) {
    log(`[BerdBot] - ${error.message}`, "red");
  }
};

export const ohNoCommand = async (message, args) => {
  try {
    const memeText = args.join(" ");
    if (memeText.length > 0) {
      let image = await canvacord.Canvas.ohno(`${memeText}`);
      let attachment = new Discord.MessageAttachment(image, "cmm.png");
      message.channel.send(attachment);
    } else {
      message.channel.send("> Please provide text");
    }
    const channelType = message.channel.name ?? "private message";
    log(
      "[BerdBot] - " +
        message.author.username +
        " used command ohno in " +
        channelType +
        " channel",
      "lightblue"
    );
  } catch (error) {
    log(`[BerdBot] - ${error.message}`, "red");
  }
};

export const opinionCommand = async (message, args) => {
  try {
    const memeText = args.join(" ");
    let avatar = message.author.displayAvatarURL({
      dynamic: false,
      format: "png",
    });
    if (memeText.length > 0) {
      let image = await canvacord.Canvas.opinion(avatar, `${memeText}`);
      let attachment = new Discord.MessageAttachment(image, "cmm.png");
      message.channel.send(attachment);
    } else {
      message.channel.send("> Please provide text");
    }
    const channelType = message.channel.name ?? "private message";
    log(
      "[BerdBot] - " +
        message.author.username +
        " used command opinion in " +
        channelType +
        " channel",
      "lightblue"
    );
  } catch (error) {
    log(`[BerdBot] - ${error.message}`, "red");
  }
};

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
