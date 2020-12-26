import _ from "lodash";

export const playMusic = async (discordBot, message, args) => {
  try {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send("You need to be in the voice channel");

    if (args[0].startsWith("https") || args[0].startsWith("http")) {
      await voiceChannel.join();
      discordBot.player.play(message, args[0]);
    }
    const video = await videoFinder(args.join(" "));

    if (video) {
      await voiceChannel.join();
      discordBot.player.play(message, video.url);
    } else {
      message.channel.send("No video results");
    }
  } catch (error) {
    console.log("ERROR ===> ", error);
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
}

export const musicSkip = async (discordBot, message) => {
  discordBot.player.skip(message);
  message.channel.send("The song has been skipped");
}

export const musicPause = async (discordBot, message) => {
  discordBot.player.pause(message);
  message.channel.send("The song is now on pause");
}

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
}

export const musicQueue = async (discordBot, message) => {
  const queue = discordBot.player.getQueue(message);
  if (_.isEmpty(queue.tracks)) {
    message.channel.send("There are no upcoming songs")
  }
  queue.tracks.map((q, index) => {
    if (index === 0)
      message.channel.send("======================");
    message.channel.send("[" + index + "]" + "\t|||" + "\t " + q.title);
    message.channel.send("======================");
  });
  console.log(queue.tracks);
}

export const musicClearQ = async (discordBot, message) => {
  discordBot.player.clearQueue(message);
  message.channel.send(`The queue has been cleared`);
}
