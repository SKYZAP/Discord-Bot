import _ from "lodash";
import { log } from "../../utils/index";

export const playMusic = async (discordBot, message, args) => {
  try {
    const search = args.join(" ");
    discordBot.player.play(message, search);

    log(
      "[BerdBot] - " +
        message.author.username +
        " is playing a song in " +
        message.channel.name +
        " channel",
      "lightblue"
    );
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const musicDestroy = async (discordBot, message) => {
  discordBot.player.stop(message);
  message.channel.send("> [DISCONNECT] I'll be back");
  log(
    "[BerdBot] - " +
      message.author.username +
      " disconnected the bot from " +
      message.channel.name +
      " channel",
    "lightblue"
  );
};

export const musicSkip = async (discordBot, message) => {
  discordBot.player.skip(message);
  message.channel.send("> [SKIPPED] The current song has been skipped");
  log(
    "[BerdBot] - " +
      message.author.username +
      " skipped a song from " +
      message.channel.name +
      " channel",
    "lightblue"
  );
};

export const musicPause = async (discordBot, message) => {
  discordBot.player.pause(message);
  message.channel.send("> [PAUSED] The song is now paused");
  log(
    "[BerdBot] - " +
      message.author.username +
      " paused a song from " +
      message.channel.name +
      " channel",
    "lightblue"
  );
};

export const musicRemove = async (discordBot, message, args) => {
  const removedTrack = discordBot.player.remove(message, parseInt(args[0]));

  message.channel.send(`> [REMOVED] ${removedTrack.title} has been removed`);

  log(
    "[BerdBot] - " +
      message.author.username +
      " removed a song from queue in " +
      message.channel.name +
      " channel",
    "lightblue"
  );
};

export const musicResume = async (discordBot, message) => {
  discordBot.player.resume(message);
  log(
    "[BerdBot] - " +
      message.author.username +
      " resumed a song from " +
      message.channel.name +
      " channel",
    "lightblue"
  );
};

export const musicQueue = async (discordBot, message) => {
  const queue = await discordBot.player.getQueue(message);
  let queueMessage: String[] = [];

  if (queue.tracks.length === 0 || queue.tracks === undefined) {
    message.channel.send("> [QUEUE] There are no upcoming songs");
  }

  if (!queue) {
    message.channel.send("> [QUEUE] There is no music queue");
  }

  queue.tracks.map((q, index) => {
    if (index === 0) {
      queueMessage.push(
        `>>> ======================================================================= \n [${index}]  \t\t${q.title} \n =======================================================================`
      );
    } else {
      queueMessage.push(
        ` [${index}]  \t\t${q.title} \n =======================================================================`
      );
    }
  });
  message.channel.send(queueMessage);
  log(
    "[BerdBot] - " +
      message.author.username +
      " viewed the queue in " +
      message.channel.name +
      " channel",
    "lightblue"
  );
};

export const musicClearQ = async (discordBot, message) => {
  discordBot.player.clearQueue(message);
  message.channel.send(`The queue has been cleared`);
  log(
    "[BerdBot] - " +
      message.author.username +
      " cleared the song queue in " +
      message.channel.name +
      " channel",
    "lightblue"
  );
};
