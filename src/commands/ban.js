const Command = require('../structures/command.js');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      aliases: [],
      ltu: client.constants.perms.staff
    });
  }

  async execute(message) {
    // addAction(message, user, mod, action, reason)
    const match = /(?:ban)\s+(?:(?:<@!?)?(\d{17,20})>?)(?:\s+([\w\W]+))/.exec(message.content);
    if (!match) return message.reply("Invalid Syntax: ban <user-id/mention> <msg>");

    const user = await this.client.users.fetch(match[1]);
    const member = await message.guild.members.fetch(match[1]);

    user.send({ embed: this.client.constants.embedTemplates.dm(message, "Banned", match[2]) })
      .catch(() => message.reply('Unable to DM user.'));
    user.send(`You may appeal at the URL below.\n<${this.client.constants.banAppealURL}>`)
      .catch(() => null);

    await member.ban();

    let logsChan = this.client.db.settings.get(message.guild.id, "logschannel");
    if (logsChan && message.guild.channels.get(logsChan)) {
      logsChan = message.guild.channels.get(logsChan);
      logsChan.send({ embed: this.client.constants.embedTemplates.logs(message, user, "Ban", match[2]) });
    }

    this.client.handlers.modNotes.addAction(message, user, message.author, "Ban", match[2]);
    return message.reply(`${user.tag} banned.`);
  }
};