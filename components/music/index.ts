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
