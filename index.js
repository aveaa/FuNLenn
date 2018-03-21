const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", () => {
  console.log(`{bot.user.username} is online!`);
});

//build failed

bot.login(process.env.BOT_TOKEN);
