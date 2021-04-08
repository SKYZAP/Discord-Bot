import _ from "lodash";
import { log } from "../../../utils/index";

export const playMusic = async (discordBot, message, args) => {
  try {
    const voiceChannel = message.member?.voice.channel;
    if (message.channel.type === "dm" || !voiceChannel) {
      message.channel.send(
        "> [ERROR] You need to be in a voice channel to play songs"
      );
    } else {
      const search = args.join(" ");
      discordBot.player.play(message, search);
      log(
        "[BerdBot] - " +
          message.author.username +
          " is playing a song in " +
          message.channel.name +
          " channel",
        "lightblue"
      );
    }
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const musicDestroy = async (discordBot, message) => {
  try {
    const voiceChannel = message.member?.voice.channel;
    if (message.channel.type === "dm" || !voiceChannel) {
      message.channel.send(
        "> [ERROR] You need to be in a voice channel to play songs"
      );
    } else if (!discordBot.player.isPlaying(message)) {
      discordBot.player.stop(message);
    } else {
      discordBot.player.stop(message);
      message.channel.send("> [DISCONNECT] I'll be back");
      log(
        "[BerdBot] - " +
          message.author.username +
          " disconnected the bot from " +
          message.channel.name +
          " channel",
        "lightblue"
      );
    }
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const musicSkip = async (discordBot, message) => {
  try {
    const voiceChannel = message.member?.voice.channel;
    if (message.channel.type === "dm" || !voiceChannel) {
      message.channel.send(
        "> [ERROR] You need to be in a voice channel to play songs"
      );
    } else if (!discordBot.player.isPlaying(message)) {
      message.channel.send("> [ERROR] No song is being played");
    } else {
      discordBot.player.skip(message);
      message.channel.send("> [SKIPPED] The current song has been skipped");
      log(
        "[BerdBot] - " +
          message.author.username +
          " skipped a song from " +
          message.channel.name +
          " channel",
        "lightblue"
      );
    }
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const musicPause = async (discordBot, message) => {
  try {
    const voiceChannel = message.member?.voice.channel;
    if (message.channel.type === "dm" || !voiceChannel) {
      message.channel.send(
        "> [ERROR] You need to be in a voice channel to play songs"
      );
    } else if (!discordBot.player.isPlaying(message)) {
      message.channel.send("> [ERROR] No song is being played");
    } else {
      discordBot.player.pause(message);
      message.channel.send("> [PAUSED] The song is now paused");
      log(
        "[BerdBot] - " +
          message.author.username +
          " paused a song from " +
          message.channel.name +
          " channel",
        "lightblue"
      );
    }
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const musicRemove = async (discordBot, message, args) => {
  try {
    const voiceChannel = message.member?.voice.channel;
    if (message.channel.type === "dm" || !voiceChannel) {
      message.channel.send(
        "> [ERROR] You need to be in a voice channel to play songs"
      );
    } else if (!discordBot.player.isPlaying(message)) {
      message.channel.send("> [ERROR] No song is being played");
    } else {
      const num = parseInt(args[0]);
      if (num === 0) {
        musicSkip(discordBot, message);
      } else {
        const removedTrack = discordBot.player.remove(
          message,
          parseInt(args[0])
        );
        message.channel.send(
          `> [REMOVED] ${removedTrack.title} has been removed`
        );

        log(
          "[BerdBot] - " +
            message.author.username +
            " removed a song from queue in " +
            message.channel.name +
            " channel",
          "lightblue"
        );
      }
    }
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const musicResume = async (discordBot, message) => {
  try {
    const voiceChannel = message.member?.voice.channel;
    if (message.channel.type === "dm" || !voiceChannel) {
      message.channel.send(
        "> [ERROR] You need to be in a voice channel to play songs"
      );
    } else if (!discordBot.player.isPlaying(message)) {
      message.channel.send("> [ERROR] No song is being played");
    } else {
      discordBot.player.resume(message);
      message.channel.send("> [RESUMED] The song is now resumed");
      log(
        "[BerdBot] - " +
          message.author.username +
          " resumed a song from " +
          message.channel.name +
          " channel",
        "lightblue"
      );
    }
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const musicQueue = async (discordBot, message) => {
  try {
    const voiceChannel = message.member?.voice.channel;
    if (message.channel.type === "dm" || !voiceChannel) {
      message.channel.send(
        "> [ERROR] You need to be in a voice channel to play songs"
      );
    } else if (!discordBot.player.isPlaying(message)) {
      message.channel.send("> [ERROR] No song is being played");
    } else {
      const queue = await discordBot.player.getQueue(message);
      let queueMessage: String[] = [];

      if (queue.tracks.length === 0 || queue.tracks === undefined) {
        message.channel.send("> [QUEUE] There are no upcoming songs");
      }

      if (!queue) {
        message.channel.send("> [QUEUE] There is no music queue");
      }

      queue.tracks.map((q, index) => {
        if (index === 0) {
          queueMessage.push(
            `>>> ======================================================================= \n [${index}]  \t\t${q.title} \n =======================================================================`
          );
        } else {
          queueMessage.push(
            ` [${index}]  \t\t${q.title} \n =======================================================================`
          );
        }
      });
      message.channel.send(queueMessage);
      log(
        "[BerdBot] - " +
          message.author.username +
          " viewed the queue in " +
          message.channel.name +
          " channel",
        "lightblue"
      );
    }
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const musicClearQ = async (discordBot, message) => {
  try {
    const voiceChannel = message.member?.voice.channel;
    if (message.channel.type === "dm" || !voiceChannel) {
      message.channel.send(
        "> [ERROR] You need to be in a voice channel to play songs"
      );
    } else if (!discordBot.player.isPlaying(message)) {
      message.channel.send("> [ERROR] No song is being played");
    } else {
      discordBot.player.clearQueue(message);
      message.channel.send(`> [CLEAR] The queue has been cleared`);
      log(
        "[BerdBot] - " +
          message.author.username +
          " cleared the song queue in " +
          message.channel.name +
          " channel",
        "lightblue"
      );
    }
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const toggleFilter = async (discordBot, message, args) => {
  try {
    if (!args[0]) {
      message.channel.send(`> [ERROR] Incorrect filter input `);
      return;
    } else if (!discordBot.player.isPlaying(message)) {
      message.channel.send(
        `> [ERROR] Cannot add filter when no songs are being played `
      );
      return;
    }
    const command = args[0].toString().toLowerCase();
    let bool;
    let action;

    if (args[1].toLowerCase() === "true") {
      bool = true;
    } else {
      bool = false;
    }

    const commands = [
      "bassboost",
      "nightcore",
      "vibrato",
      "8d",
      "vaporwave",
      "phaser",
      "tremolo",
      "reverse",
      "treble",
      "normalizer",
      "surrounding",
      "pulsator",
      "subboost",
      "karaoke",
      "flanger",
      "gate",
      "haas",
      "mcompand",
    ];

    if (!commands.includes(command)) {
      message.channel.send(`> [ERROR] Filter not available`);
      return;
    }

    commands.forEach((com) => {
      if (command === "8d" && com === "8d") {
        filter = { "8D": com };
        discordBot.player.setFilters(message, filter);
        action = com.toUpperCase();
      } else if (command === com) {
        var filter = { [com]: com };
        discordBot.player.setFilters(message, filter);
        action = com.toUpperCase();
      }
    });

    message.channel.send(`> [${action.toUpperCase()}] Filter set to ${bool}`);

    log(
      "[BerdBot] - " +
        message.author.username +
        " toggled the " +
        action +
        " filter, in the " +
        message.channel.name +
        " channel",
      "lightblue"
    );
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};

export const resetFilter = async (discordBot, message) => {
  try {
    discordBot.player.setFilters(message, {
      bassboost: false,
      nightcore: false,
      vibrato: false,
      "8D": false,
      vaporwave: false,
      phaser: false,
      tremolo: false,
      reverse: false,
      treble: false,
      normalizer: false,
      surrounding: false,
      pulsator: false,
      subboost: false,
      karaoke: false,
      flanger: false,
      gate: false,
      haas: false,
      mcompand: false,
    });
    message.channel.send("> [RESET] Song filters have been reset");
    log(
      "[BerdBot] - " +
        message.author.username +
        " resetted the filters in the " +
        message.channel.name +
        " channel",
      "lightblue"
    );
  } catch (error) {
    log("[BerdBot] - " + error.message, "red");
  }
};
