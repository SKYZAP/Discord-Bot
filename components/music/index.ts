import _ from "lodash";

export const playMusic = async (message, args) => {
  const ytdl = require("ytdl-core");
  const ytSearch = require("yt-search");
  const voiceChannel = message.member.voice.channel;

  if (!voiceChannel)
    return message.channel.send(
      "You need to be in the voice channel to use this command"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT"))
    return message.channel.send("You dont have the correct permissions");
  if (!permissions.has("SPEAK"))
    return message.channel.send("You dont have the correct permissions");
  if (!args.length) return message.channel.send("You need to send the title");

  const connection = await voiceChannel.join();

  const videoFinder = async (query) => {
    const videoResult = await ytSearch(query);
    console.log(query);
    return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
  };
  const video = await videoFinder(args.join(" "));

  if (video) {
    const stream = ytdl(video.url, { filter: "audioonly" });
    connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
      voiceChannel.leave();
    });

    await message.reply(`Now playing ${video.title}`);
  } else {
    message.channel.send("Video cannot be found");
  }
};

export const musicDestroy = async (discordBot, message) => {
  discordBot.player.stop(message);
  message.channel.send("I'll be back");
};

export const musicSkip = async (discordBot, message) => {
  discordBot.player.skip(message);
  message.channel.send("The song has been skipped");
};

export const musicPause = async (discordBot, message) => {
  discordBot.player.pause(message);
  message.channel.send("The song is now on pause");
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
};

export const musicQueue = async (discordBot, message) => {
  const queue = discordBot.player.getQueue(message);
  queue.tracks.map((q, index) => {
    if (index === 0) message.channel.send("======================");
    message.channel.send("[" + index + "]" + "\t|||" + "\t " + q.title);
    message.channel.send("======================");
  });
  console.log(queue);
};
