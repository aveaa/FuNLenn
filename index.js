//
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
    msg.channel.send({
        embed: {
            color: 0xff0000,
            title: msg.author.tag,
            fields: [
                {
                    name: 'Твич Флейма',
                    value: 'https://www.twitch.tv/flimeus'
                },
                {
                    name: 'Ютуб Флейма',
                    value: 'https://www.youtube.com/channel/UCp_yHWYMIXXQ8LFDdM5Q0SQ'
                }
            ],
            timestamp: new Date(),
        }
    });
}

});

client.login(process.env.BOT_TOKEN);
