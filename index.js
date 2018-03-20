const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", () => {
  console.log(`{bot.user.username} is online!`);
});

bot.login('process.env.NDI1MzQ3ODgyODA0MzE0MTMy.DZImoQ.1vlCB0_Gj7KP4KKfVLHLMx_FpiA');
