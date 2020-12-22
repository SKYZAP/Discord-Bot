export const musicStop = async(message, args) => {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.channel.send('You need to be in the voice channel');

    const videoResult = await ytSearch(query);
    videoResults.video[0];
    await message.channel.send("I'm putting a stop to the music");
}