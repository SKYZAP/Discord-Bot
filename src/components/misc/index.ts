import { getUserFromMention, log } from "../../../utils/index";
import "reflect-metadata";
import { getConnection } from "typeorm";
import { addUser, deleteUser, User } from "../../../src/models/user";
import { Message, MessageEmbed } from "discord.js";
import {
  DiscordPrompt,
  DiscordPromptFunction,
  MenuEmbed,
  MenuVisual,
  PromptNode,
} from "discord.js-prompts";
require("dotenv").config();
const canvacord = require("canvacord");
const Discord = require("discord.js");

export const penisCommand = async (discordBot, message, args) => {
  const length = Math.floor(Math.random() * 24);
  const con = getConnection();
  const repository = con.getRepository(User);

  let author = await repository.findOne({
    discordId: message.author.id,
  });

  if (!author) {
    addUser(message, length, 0);
    author = await repository.findOne({ discordId: message.author.id });
  }

  if (args[0]) {
    const user = getUserFromMention(args[0], discordBot);

    if (!user) return message.reply("User not found");

    let mentionUser = await repository.findOne({ discordId: user.id });

    if (!mentionUser) {
      await repository.save({
        discordId: user.id,
        username: user.username,
        length: length,
        playtime: 0,
      });
      mentionUser = await repository.findOne({ discordId: user.id });
    }

    message.channel.send(
      `<@${mentionUser.discordId}> penis size is ***` +
        mentionUser.length.toString() +
        " inches***"
    );
  } else {
    message.reply(
      "your penis size is ***" + author.length.toString() + " inches***"
    );
  }

  const channelType = message.channel.name ?? "private message";

  log(
    "[BerdBot] - " +
      message.author.username +
      " used command penis in " +
      channelType +
      " channel",
    "lightblue"
  );
};

export const pingCommand = async (message, args) => {
  try {
    message.reply("Pong!");
    const channelType = message.channel.name ?? "private message";

    log(
      "[BerdBot] - " +
        message.author.username +
        " used command ping in " +
        channelType +
        " channel",
      "lightblue"
    );
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const slapCommand = (discordBot, message, args) => {
  const length = Math.floor(Math.random() * 100);

  if (length >= 0 && length < 80) {
    if (args[0]) {
      const user = getUserFromMention(args[0], discordBot);
      if (!user) return message.reply("User not found");
      message.channel.send(`<@${user.id}> was slapped :clap:`);
    } else {
      message.reply("You can't slap yourself");
    }
  } else if (length >= 80 && length <= 100) {
    message.reply("You were confused and slapped yourself");
  }

  const channelType = message.channel.name ?? "private message";

  log(
    "[BerdBot] - " +
      message.author.username +
      " used command slap in " +
      channelType +
      " channel",
    "lightblue"
  );
};

export const resetLength = async (message) => {
  if (
    message.author.id.toString() === "254141160895938560" ||
    message.author.id.toString() === "113701822966923265" ||
    message.author.id.toString() === "187939016971124737"
  ) {
    await deleteUser(message);
    message.reply("[RESET] Successfully resetted your length");
  } else {
    message.reply("[ERROR] You dont have permission to use this command");
  }
};

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
        " used command hitler in " +
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

export const testEmbed = async (message) => {
  let MyData;
  const embed = new MessageEmbed({
    title: "What is your favorite fruit?",
  });
  const askFruitMenu = new MenuEmbed(embed)
    .addOption("Apple")
    .addOption("Orange")
    .addOption("Broccoli", "Broccoli is so tasty, it might as well be a fruit");
  const askFruitVisual = new MenuVisual(askFruitMenu);

  const askFruitFn: DiscordPromptFunction<String> = async (
    message: Message,
    data: String
  ) => {
    const { content } = message;
    if (content === "1") {
      // apple
    } else if (content === "2") {
      // orange
    } else {
      // broccoli
    }
    return data;
  };

  const askFruitPrompt = new DiscordPrompt<String>(askFruitVisual, askFruitFn);
  const askFruitNode = new PromptNode(askFruitPrompt);
};
