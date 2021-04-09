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
