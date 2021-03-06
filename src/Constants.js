const { MessageEmbed } = require("discord.js");

module.exports = {
  "perms": {
    // To Protect Eval
    "dev": 10,
    "staff": 9,
    "helper": 8,
    "user": 1,
    "blacklist": 0
  },
  "colours": {
    // Status
    "info": "0x00FFF9",
    "error": "0xFF0000",
    "warn": "0xFF8800",
    "success": "0x00FF00",

    // Guild/VC
    "join": "0x00FF00",
    "leave": "0xFF0000",
    "change": "0x000000",

    // Message
    "edit": "0xFFFF00",
    "delete": "0xFF0000"
  },
  "defaultSettings": {
    "antiinvite": null, // Boolean
    "antiinvitewhitelist": null, // Array of strings

    // AutoMod related settings
    "automodlogschannel": null, // Channel ID
    "automodlist": [], // Array of strings

    // Detention/mute settings
    "detentioncategory": null, // Category ID
    "detentionrole": null, // Role ID

    // Role/permission settings
    "helperrole": null, // Role ID
    "mutedrole": null, // Role ID
    "staffrole": null, // Role ID

    // Log channel settings
    "modlogschannel": null, // Channel ID
    "messagelogschannel": null, // Channel ID
    "memberlogschannel": null, // Channel ID
    "vclogschannel": null, // Channel ID

    // Dynamic VC settings
    "dynamicvccategory": null, // Channel (Category) ID
    "dynamicvcbasevc": null, // Channel ID

    // Misc. settings
    "starboard": {} // Object
  },
  "defaultNotes": {
    "actions": [],
    "notes": []
  },
  "defaultStarboard": {
    // chan-msg
    "sbEntryID": null,
    "count": 0
  },
  "banAppealURL": "https://docs.google.com/forms/d/1t9lQxW-E-CAtDPBRqj2yMvqO0cSe_4bPlGvxrmvtWyA/viewform",
  "embedTemplates": {
    "dm": (message, action, reason) => {
      return new MessageEmbed()
        .setAuthor(action, message.guild.iconURL(), "https://google.com")
        .addField("» Moderator", `${message.author.tag} (${message.author.id})`, false)
        .addField("» Reason", reason, false)
        .setTimestamp()
        .setColor(0x00FFF9);
    },
    "logs": (message, user, action, reason) => {
      const embed = new MessageEmbed()
        .setAuthor(`${user.tag} (${user.id})`, user.displayAvatarURL(), "https://google.com")
        .addField("» Action", action, false)
        .addField("» Moderator", `${message.author.tag} (${message.author.id})`, false)
        .addField("» Reason", reason, false)
        .setTimestamp();

      if (/(?:temp)?ban/i.test(action)) return embed.setColor(0xFF0000);
      if (/kick/i.test(action)) return embed.setColor(0xFFA500);
      if (/mute|detention|silence/i.test(action)) return embed.setColor(0xFFFF00);
      if (/warn/i.test(action)) return embed.setColor(0x00FF00);
      return embed.setColor(0x00FFF9);
    }
  }
};