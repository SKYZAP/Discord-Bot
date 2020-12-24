const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

export const playMusic = async (discordBot, message, args) => {
<<<<<<< HEAD
  const voiceChannel = message.memeber.voice.channel;

  if (!voiceChannel) return message.channel.send("You need to be in the voice channel to use this command");
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has('CONNECT')) return message.channel.send("You dont have the correct permissions");
  if (!permissions.has('SPEAK')) return message.channel.send("You dont have the correct permissions");
  if (!args.length) return message.channel.send("You need to send the title");

  const connection = await voiceChannel.join();

  const videoFinder = async (query) => {
    const videoResult = await ytSearch(query);

    return (videoResult.videos.lenth > 1) ? videoResult.videos[0] : null;

=======
  try {
    console.log(args[0]);
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send("You need to be in the voice channel");

    if (args[0].startsWith("https://open.spotify.com/")) {
      console.log("SPOTIFY");
      await voiceChannel.join();
      discordBot.player.play(message, args[0]);
    } else if (args[0].startsWith("https") || args[0].startsWith("http")) {
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
>>>>>>> 35db101091d8b9a93e5f60eb77324f2e0a4f2ea8
  }
  const video = await videoFinder(args.join(" "));

  if (video) {
    const stream = ytdl(video.url, { filter: 'audoonly' });
    connection.play(stream, { seek: 0, volume: 1 })
      .on('finish', () => {
        voiceChannel.leave();
      });

    await message.reply(`Now playing ${video.title}`);
  } else {
    message.channel.send("Video cannot be found");
  }
};
