import _ from "lodash";
import { log } from "../../utils/index";

export const playMusic = async (discordBot, message, args) => {
  try {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send("You need to be in the voice channel");

    if (args[0].startsWith("https") || args[0].startsWith("http")) {
      const video = await videoFinder(args[0]);

      if (!video) {
        message.channel.send("Song not found");
      }

      await voiceChannel.join();
      discordBot.player.play(message, video.url);

      log(
        "[BerdBot] - " +
          message.author.username +
          " is playing a song from " +
          args[0],
        "lightblue"
      );
    } else {
      const video = await videoFinder(args.join(" "));

      if (!video) {
        message.channel.send("No video results");
      }

      await voiceChannel.join();
      discordBot.player.play(message, video.url);
      log(
        "[BerdBot] - " +
          message.author.username +
          " is playing " +
          video.title +
          " in " +
          message.channel.name +
          " channel",
        "lightblue"
      );
    }
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

const videoFinder = async (query) => {
  const ytSearch = require("yt-search");
  const videoResult = await ytSearch(query);

  return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
};

export const musicDestroy = async (discordBot, message) => {
  discordBot.player.stop(message);
  message.channel.send("I'll be back");
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
  message.channel.send("The song has been skipped");
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
  message.channel.send("The song is now on pause");
  log(
    "[BerdBot] - " +
      message.author.username +
      " paused a song from " +
      message.channel.name +
      " channel",
    "lightblue"
  );
};

// export const musicRemove = async (discordBot, message, track) => {
//   const remove = discordBot.player.remove(message, track);
//   remove.track.map((q, index) => {
//     if (q.index[" "] === "remove")
//       index - remove;
//     message.channel.send("The song has been removed");
//   })
//   console.log(remove);
// }

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
  if (queue.tracks.length === 0) {
    message.channel.send("There are no upcoming songs");
  }
  queue.tracks.map((q, index) => {
    if (index === 0) message.channel.send("======================");
    message.channel.send("[" + index + "]" + "\t|||" + "\t " + q.title);
    message.channel.send("======================");
  });
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
      " cleared the song queue from " +
      message.channel.name +
      " channel",
    "lightblue"
  );
};
