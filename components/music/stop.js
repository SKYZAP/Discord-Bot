export const musicStop = async(message, args) => {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.channel.send('You need to be in the voice channel');

    const connection = voiceChannel.join();
    await connection.stop();
    await message.channel.send("I'll be back")
}