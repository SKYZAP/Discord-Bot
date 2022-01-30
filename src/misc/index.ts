export const SheeshFuncOptions = "bussin" || "bussing" || "bussin'";

export const SheeshFunc = async (message) => {
  const {
    AudioPlayer,
    createAudioResource,
    StreamType,
    entersState,
    VoiceConnectionStatus,
    joinVoiceChannel,
  } = require("@discordjs/voice");
  const discordTTS = require("discord-tts");
  let voiceConnection;
  let audioPlayer = new AudioPlayer();

  const stream = discordTTS.getVoiceStream("Sheesh my dudes");
  const audioResource = createAudioResource(stream, {
    inputType: StreamType.Arbitrary,
    inlineVolume: true,
  });

  if (
    !voiceConnection ||
    voiceConnection?.status === VoiceConnectionStatus.Disconnected
  ) {
    voiceConnection = joinVoiceChannel({
      channelId: message.member.voice.channelId,
      guildId: message.guildId,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    voiceConnection = await entersState(
      voiceConnection,
      VoiceConnectionStatus.Ready,
      5_000,
    );
  }

  if (voiceConnection._state.status === VoiceConnectionStatus.Ready) {
    voiceConnection.subscribe(audioPlayer);
    audioPlayer.play(audioResource);
    setTimeout(() => {
      voiceConnection.destroy();
    }, 3000);
  }
};
