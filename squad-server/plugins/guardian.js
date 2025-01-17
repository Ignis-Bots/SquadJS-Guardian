import axios from 'axios';
import DiscordBasePlugin from './discord-base-plugin.js';

export default class Guardian extends DiscordBasePlugin {
  static get description() {
    return "The <code>Guardian</code> plugin is from Squad Guardian's Onlybans.";
  }

  static get defaultEnabled() {
    return false;
  }

  static get optionsSpecification() {
    return {
      ...DiscordBasePlugin.optionsSpecification,
      channelID: {
        required: true,
        description: 'The ID of the channel to log to.',
        default: '',
        example: '667741905228136459',
      },
      color: {
        required: false,
        description: 'The color of the embed.',
        default: 16761867,
      },
      pingGroups: {
        required: false,
        description: 'A list of Discord role IDs to ping.',
        default: [],
        example: ['500455137626554379'],
      },
      pingHere: {
        required: false,
        description:
          'Ping @here. Great if Admin Requests are posted to a Squad Admin ONLY channel, allows pinging only Online Admins.',
        default: false,
      },
      warnInGameAdmins: {
        required: false,
        description:
          'Should in-game admins be warned after a players uses the command and should we tell how much admins are active in-game right now.',
        default: true,
      },
    };
  }

  constructor(server, options, connectors) {
    super(server, options, connectors);

    this.onPlayerConnected = this.onPlayerConnected.bind(this);
  }

  async mount() {
    this.server.on('PLAYER_CONNECTED', this.onPlayerConnected);
  }

  async unmount() {
    this.server.removeEventListener('PLAYER_CONNECTED', this.onPlayerConnected);
  }

  async onPlayerConnected(info) {
    if (!info.player || !info.player.steamID) {
      return this.verbose(1, 'ERROR: Connected-Player | No SteamID');
    }
    try {
      // Make request to Guardian API
      const response = await axios.get(
        `https://api.guardianonlybans.com/boloCheck`,
        {
          params: {
            steamID: info.player.steamID,
            serverName: this.server.serverName,
          },
        }
      );

      if (
        response.data.data !== null &&
        response.data.data.steamID === info.player.steamID
      ) {
        const admins = this.server.getAdminsWithPermission(
          'canseeadminchat',
          'eosID'
        );

        for (const player of this.server.players) {
          if (!admins.includes(player.eosID)) continue;
          if (this.options.warnInGameAdmins)
            await this.server.rcon.warn(
              player.eosID,
              `[${info.player.name}] - Player has a BOLO on record in Guardian!`
            );
        }

        const message = {
          embed: {
            title: `Player ${info.player.name} has a BOLO on record!`,
            description: `This Player is in Guardian's BOLO list.\nhttps://canary.discord.com/channels/1174357658971668551/${response.data.data.threadID}\nKeep an eye out on this player as a possible Cheater.
            [${info.player.steamID}](https://steamcommunity.com/profiles/${info.player.steamID})`,
            color: this.options.color,
            fields: [
              {
                name: 'Player',
                value: `\`\`\`${info.player.name}\`\`\``,
                inline: true,
              },
              {
                name: 'SteamID',
                value: `\`\`\`${info.player.steamID}\`\`\``,
                inline: true,
              },
              {
                name: "Player's EosID",
                value: `\`\`\`${info.player.eosID}\`\`\``,
                inline: true,
              },
              {
                name: 'Team & Squad',
                value: `Team: ${info.player.teamID}, Squad: ${
                  info.player.squadID || 'Unassigned'
                }`,
              },
              {
                name: 'BOLO Created',
                value: `<t:${Math.floor(
                  new Date(response.data.data.dateAdded).getTime() / 1000
                )}:f>`,
              },
            ],
            timestamp: new Date().toISOString(),
          },
        };

        if (this.options.pingHere === true) {
          message.content = `@here`;
        }

        if (this.options.pingGroups.length > 0) {
          message.content += ` ${this.options.pingGroups
            .map((groupID) => `<@&${groupID}>`)
            .join(' ')}`;
        }

        message.content += ` - Joining Player \`${info.player.name}\` has a BOLO on record!`;

        await this.sendDiscordMessage(message);
      }
    } catch (error) {
      console.error(error);
    }
  }
}
