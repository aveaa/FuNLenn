//

const Discord = require("discord.js");

const client = new Discord.Client();

if (msg.content === 'FN!Flimeus') {

client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);

});



client.on('message', msg => {

    if (msg.content === 'ping') {

    msg.reply('pong');

}




const embed = new Discord.RichEmbed()
.setColor (#ff0000)
.setTitle (`**Полезные ссылки`)
.addField (`FN!Flimeus`)
.setThumbnail (`https://media.discordapp.net/attachments/418113340871540746/426018657009926144/unknown.png`)
.setTimestap (new Date())

message.channel.send({embed});

console.log(`${sender.tag} написал комманду ${prefix}Flimeus`);

        }

    });

}



});

client.login(process.env.BOT_TOKEN);
