const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const logger = require('./logger');



let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));

const prefix = "f!";

bot.on("message", message => {
  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
    level: 0
  };
  let userData = points[message.author.id];
  userData.points++;

  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    // Level up!
    userData.level = curLevel;
    message.reply(`Ты поднял свой уровень до **${curLevel}**!`);
  }

  if (message.content.startsWith(prefix + "level")) {
    message.reply(`Твой уровень ${userData.level}, с ${userData.points} поинтами.`);
  }
  fs.writeFile("./points.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });

});


bot.on('ready', () => {
  console.log('Bot on')
  bot.user.setGame('f!help', 'https://twitch.tv/funnlennysub');
});


bot.on('messageDelete', msg => {

  logger.delete(msg, bot);

});

bot.on('messageUpdate', (msgOld, msgNew) =>{

  logger.update(msgOld, msgNew, bot);

});


bot.on('guildMemberAdd', member => {
  logger.join(member, bot);

});


bot.on('guildMemberRemove', member =>{

  logger.leave(member, bot);

});


bot.on('message', message => {
  if (message.content === 'f!avatar') {
    message.reply(message.author.avatarURL);
  }
});

bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'member-log');
  if (!channel) return;
  channel.send(`Добро пожаловать на мой сервер, ${member}`);
});

bot.on("message", async message => {



//f!help
if (message.content === 'f!help') {

  const embed = {
    "title": "<a:hui:434702628258185237>Функции бота<a:hui:434702628258185237>",
    "color": 16312092,
    "footer": {
      "icon_url": "https://cdn.discordapp.com/attachments/295476460502646784/434605674245259264/x0aerZMZKFM.jpg",
      "text": "© Воссоздано: FuNLenny"
    },
    "fields": [
      {
        "name": "f!avatar",
        "value": "**Бот отправит вам ссылку на вашу аватарку**"
      },
      {
        "name": "f!mods",
        "value": "Покажет вам модеров этого дс"
      },
      {
        "name": "f!level",
        "value": "Покажет вам ваш уровень и кол-во поинтов"
      },
      {
        "name": "f!listemojis",
        "value": "Покажет все смайлы этого сервера"
      }
    ]
  };
  message.channel.send({embed});

}


//mods
if (message.content === 'f!mods') {

const embed = {
  "title": "<a:hui:434702628258185237>Модерация этого ДС<a:hui:434702628258185237>",
  "color": 16645926,
  "footer": {
    "icon_url": "https://cdn.discordapp.com/attachments/295476460502646784/434605674245259264/x0aerZMZKFM.jpg",
    "text": "© Воссоздано: FuNLenny"
  },
  "thumbnail": {
    "url": "https://cdn.discordapp.com/attachments/295476460502646784/434733080390139914/ggg.png"
  },
  "fields": [
    {
      "name": 'Demix(Влад)',
      "value": "**Программист**"
    },
    {
      "name": "Yamaxila",
      "value": "**Прогруммер**"
    },
    {
      "name": "Iosin",
      "value": "**Аднаклзнег(нет)**឵឵឵឵឵"
    }
  ]
};
message.channel.send({embed});
}

if (message.content === "f!listemojis") {
  const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
  message.channel.send(emojiList);
}

//random
if (message.content.startsWith(`${prefix}random`)) {

    let i = Math.floor(Math.random() * (5- 1 + 1) + 1);
    switch (i) {
      case 1:
        message.channel.send('Рандомное число 1🎲')
        break;
      case 2:
        message.channel.send('Рандомное число 2🎲')
        break;
      case 3:
        message.channel.send('Рандомное число 3🎲')
        break;
      case 4:
        message.channel.send('Рандомное число 4🎲')
        break;
      case 5:
        message.channel.send('Рандомное число 5🎲')
        break;
    }

  }



});
bot.login(process.env.BOT_TOKEN)
