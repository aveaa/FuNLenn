*//

const Discord = require("discord.js");

const client = new Discord.Client();

let prefix = `FN!`

client.on('ready', () => {



    console.log(`Logged in as ${client.user.tag}!`);

});



client.on('message', message => {

  let sender = message.author;

    if (message.content === 'ping') {

    message.reply('pong');

}


if (message.content === 'FN!Flimeus') {

const embed = new Discord.RichEmbed()
.setColor (0xff0000)
.setTitle (`**Полезные ссылки**`)
.addField (`FN!Flimeus`)
.setField (`**Твич Флейма**`,`https://www.twitch.tv/flimeus`)
.setField (`**Ютуб Флейма**`, `: https://www.youtube.com/channel/UCp_yHWYMIXXQ8LFDdM5Q0SQ`)
.setThumbnail (`https://media.discordapp.net/attachments/418113340871540746/426018657009926144/unknown.png`)
.setTimestamp (new Date())

message.channel.send({embed});

        }




});

client.login(process.env.BOT_TOKEN);
