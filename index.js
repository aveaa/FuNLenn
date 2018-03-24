//

const Discord = require("discord.js");

const client = new Discord.Client();

let prefix = `FN!`

client.on('ready', () => {
client.user.setActivity("Ласт Таск")

    console.log(`Logged in as ${client.user.tag}!`);

});


client.on('message', message => {

  let sender = message.author;

    if (message.content === 'ping') {

    message.reply('pong');

}

if (message.content === 'FN!Info') {

const embed = new Discord.RichEmbed()
.setColor (0xff0000)
.setTitle (`**Полезные ссылки**`)
.addField (`**Твич Флейма**`,`https://www.twitch.tv/flimeus`)
.addField (`**Ютуб Флейма**`,`https://www.youtube.com/channel/UCp_yHWYMIXXQ8LFDdM5Q0SQ`)
.addField (`**Группа Флейма в ВК**`,`https://vk.com/flimeusoffical`)
.addField (`**Правила На стримах**`,`https://vk.com/flimeusoffical?w=wall-112110355_3223`)
.setFooter(`© Powered by FuNLenny, NeadApTar and Yamaxila`)
.setThumbnail (`https://media.discordapp.net/attachments/418113340871540746/426018657009926144/unknown.png`)
.setTimestamp (new Date())

message.channel.send({embed});


(message.content.startsWith(`${prefix}kick`))

//kick command
let kUser = message.guild.member(message.menitions.user.first() || message.guild.members.get(args[0]));
if(!kUser) message.channel.send("Cant find user!");
let kReason = args.join(" ").slice(22);
if(!message.member.hasPermision("MANAGE_MESSAGES")) return message.channel.send(":Kappa:");
if(kUser.hasPermision("MANAGE_MESSAGES")) return message.channel,send("Невозможно выполнить эту команду.");

let kickEmbed = new Discord.RichEmbed()
.setDescription("**Информация о кике**")
.setColor("#e56b00")
.addField("Кикнутый участник", `${kUser} имеющий ID ${kUser.id}`)
.addField("Кикнут", `<@${message.author.id}> имеющий ID ${message.author.id}`)
.addField("Time", message.createdAt)
.addField("Причина", kReason);

let kickChannel = message.guild.channels.find(`name`, "main-chat");
if(!kickChannel) return message.channel.send("Невозможно найти main-chat канал.")



kickChannel.send(kickEmbed);

  return;
}



});


client.login(process.env.BOT_TOKEN);
