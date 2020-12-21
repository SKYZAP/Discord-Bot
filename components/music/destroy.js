export const musicDestroy = async(message, args) => {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.channel.send('You need to be in the voice channel');

    await voiceChannel.leave();
    await message.channel.send("I'll be back")
}