import ytdl from "ytdl-core";
import ytSearch from "yt-search";

export const musicPlay = async(message, args) => {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.channel.send('You need to be in the voice channel');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) return message.channel.send('You need permission from the');
    if (!permissions.has('SPEAK')) return message.channel.send('You do not have permission');
    if (!args.length) return message.channel.send('You need to add a song name!');

    const connection = await voiceChannel.join();

    const videoFinder = async(query) => {
        const videoResult = await ytSearch(query);

        return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    const video = await videoFinder(args.join(' '));

    if (video) {
        const stream = ytdl(video.url, { filter: 'audioonly' });
        connection.play(stream, { seek: 0, volume: 1 })
            .on('finish', () => {
                voiceChannel.leave();
            });

        await message.reply(`Now Playing ${video.title}`)
    } else {
        message.channel.send('No video results found')
    }

}