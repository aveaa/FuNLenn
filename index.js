const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const moment = require('moment');

fs.readdir("./commands/", (err, files) => {


  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;

  }


  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);

  });
});


let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

const logger = require('./logger');

bot.on('message', message => {

let sender = message.author;
let msg = message.content.toUpperCase();
let prefix = 'p!'

if (bot.user.id === message.author.id) { return }

let userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

if (!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {}
if (!userData[sender.id + message.guild.id].money) userData[sender.id + message.guild.id].money = 0;
if (!userData[sender.id + message.guild.id].lastDaily) userData[sender.id + message.guild.id].lastDaily = 'Не собрана';

fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
  if (err) console.error(err);

})

//money [Access your balance]
if (message.content === 'p!money') {
  message.channel.send({"embed":{
    title: "Банк🏦",
    color: 0x32ff00,
    fields:[{
      name:"Владелец",
      value:message.author.username,
      inline:true
    },
    {
      name:"Баланс💸",
      value:userData[sender.id + message.guild.id].money,
      inline:true
    }]
  }})
}
//daily reward
if (message.content === 'p!daily') {
  if (userData[sender.id + message.guild.id].lastDaily != moment().format('llll')) {
    userData[sender.id + message.guild.id].lastDaily = moment().format('llll')
    userData[sender.id + message.guild.id].money += 200;
    message.channel.send({embed:{
      title:"Дневная награда",
      description:"Ты получил 200💸!"
    }})
  } else {
    message.channel.send({embed:{
      title:"Дневная награда",
      description:"Ты уже получил свою дневную награду! Ты можешь забрать её **" + moment().locale('ru').add(1, 'days').calendar() + '**.'
    }})
  }
}

fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
  if (err) console.error(err);

})

})
bot.on('ready', () => {
  console.log('Bot on')
  bot.user.setGame('p!help', 'https://twitch.tv/funnlennysub');
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

bot.on("message", async message => {
  //p!news
    if (message.content === 'p!news') {
    message.reply('**Актуальные новости:**```fix\nА на повестке дня у нас анонс обхода. На самом деле ничего не изменилось, в субботу, в 19:00 (По МСК) пройдёт обход. Так как после третьего набора пришли новички, думаю стоит уже всем напомнить, как проводится обход. Чтобы попасть на обход, Вам нужно быть на сервере в указанное время. После того, как на экране появится надпись, что обход начался, нужно прописать команду /detour join и Вы станете его участником. Не забудьте встать рядом с Вашими постройками и табличками, на которых Вы заранее написали текст. Из гостей на этот обход у нас никого, так что будет стримить наш местный стример Евгения.```');

}
//p!visitor
  if (message.content === 'p!visitors') {

    const embed = {
      "title": "Наши гости:",
      "color": 16711680,
      "footer": {
        "icon_url": "https://images-ext-1.discordapp.net/external/ct0H75HfJwarmpdBOnZcn8Dh_S0Xw62UGYRhXUh1_NY/https/images-ext-2.discordapp.net/external/dpkXlv3ajh2zgwcrFehjNd9U5zcO3nlwSt8QLqktWGs/https/images-ext-2.discordapp.net/external/hAhv9PI0tMAL4H9kmwK8Wg0IuoTvtAf2VfqGV4dlR-g/https/cdn.discordapp.com/attachments/426472754905219082/429698578013749249/andaria.png",
        "text": "© Воссоздано: FuNLenny и MaxPanda2402"
      },
      "thumbnail": {
        "url": "https://cdn.discordapp.com/attachments/426472754905219082/431518325919580160/YouTube_icon.png"
      },
      "fields": [
        {
          "name": "Uno",
          "value": "https://www.youtube.com/channel/UCeU5yE37yVxGPAUT7MClKaw"
        },
        {
          "name": "BimSon",
          "value": "https://www.youtube.com/channel/UCk7jYmRRaSlLwNSdYV3cjvw"
        },
        {
          "name": "SFAS",
          "value": "https://www.youtube.com/channel/UCzR6zrBt37TB5eP5WzsO1Ow"
        },
        {
          "name": "Snr Jiraf",
          "value": "https://www.youtube.com/channel/UC8OL55ISkmkgO-5Vjat5ryg"
        }
      ]
    };
    message.channel.send({ embed });
}



///Information
if (message.content === 'p!info') {


  const embed = {
    "title": "Информация:",
    "color": 5581206,
    "footer": {
      "icon_url": "https://cdn.discordapp.com/attachments/426472754905219082/429698578013749249/andaria.png",
      "text": "© Воссоздано: FuNLenny и MaxPanda2402"
    },
    "thumbnail": {
      "url": "https://cdn.discordapp.com/attachments/426472754905219082/429310377130721301/emoji.gif"
    },
    "fields": [
      {
        "name": "Группа в ВК",
        "value": "https://vk.com/pandaria_minecraft"
      },
      {
        "name": "Подать заявку",
        "value": "https://vk.com/app5619682_-157977237"
      },
    ]
  };
  message.channel.send({embed});
}

//p!admins
if (message.content === 'p!admins') {

const embed = new Discord.RichEmbed()

.setColor("#ffe200")
.setTitle(`Важные люди:`)
.addField(`MaxPanda2402 - Создатель`,`https://vk.com/pandos24`)
.addField(`_VLONE_ - Админ`,`https://vk.com/id461698804`)
.addField(`FuNLenny - Создатель этого бота`,`https://vk.com/bordey1`)
.addField(`Qyzi - Тех. Админ`,`https://vk.com/id119946091`)
.addField(`Skvirell - Редактор`, `https://vk.com/kate.skvirell`)
.addField(`virus_v_kedax - Гл.Хелпер`,`https://vk.com/romaefarov`)
.addField(`Hippo_and_Me - Хелпер`,`https://vk.com/hippo_and_me`)
.addField(`NaNoXumuk - Хелпер`,`https://vk.com/nanoxumuk`)
.addField(`ANTON_B - Хелпер`, `https://vk.com/anton_b1999`)
.addField(`TheDito - Хелпер`,`https://vk.com/id215452229`)
.addField(`Quzz - Хелпер`,`https://vk.com/horoshiyid`)
.addField(`Koelbox - Хелпер`,`https://vk.com/elect16`)
.setThumbnail(`https://cdn.discordapp.com/attachments/426472754905219082/429693409754873879/emoji.png`);

message.channel.send({embed});
}

//p!help
if (message.content === 'p!help') {

  const embed = {
    "title": "Возможности бота",
    "color": 16312092,
    "footer": {
      "icon_url": "https://images-ext-2.discordapp.net/external/hAhv9PI0tMAL4H9kmwK8Wg0IuoTvtAf2VfqGV4dlR-g/https/cdn.discordapp.com/attachments/426472754905219082/429698578013749249/andaria.png",
      "text": "© Воссоздано: FuNLenny и MaxPanda2402"
    },
    "thumbnail": {
      "url": "https://cdn.discordapp.com/attachments/426472754905219082/429697014465429543/kreygasm.gif"
    },
    "fields": [
      {
        "name": "p!info",
        "value": "**Нужная вам информация**   ",
        "inline": false
      },
      {
        "name": "p!admins",
        "value": "**Важные лица сервера**",
        "inline": false
      },
      {
        "name": "p!news",
        "value": "**Новости сервера/группы**",
        "inline": false
      },
      {
        "name": "p!visitors",
        "value": "**Люди которые приходят на обходы**",
        "inline": false
      },
      {
        "name": "p!daily",
        "value": "**Получить дневную награду в размере 200 коинов**",
        "inline": true
      },
      {
        "name": "p!money",
        "value": "**Количество ваших коинов**",
        "inline": false
      }
    ]
  };
  message.channel.send({embed});

}
//p!privet, p!poka
if (message.content === 'p!privet') {
  message.channel.send('**Добро пожаловать, Пандарен**');
}

if (message.content === 'p!poka') {
  message.channel.send('приятно было с тобой поиграть');
}


});
client.login(process.env.BOT_TOKEN);
