const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
    msg.reply('pong');
}
if (msg.content === 'FN!Flimeus') {
    msg.reply('Твич Флейма https://www.twitch.tv/flimeus\n Ютуб Флейма https://www.youtube.com/channel/UCp_yHWYMIXXQ8LFDdM5Q0SQ ');
}
});

client.login(process.env.BOT_TOKEN);
