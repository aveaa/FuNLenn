const Discord = require('discord.js');



module.exports = {



delete: function(msg, bot) {

  let e = new Discord.RichEmbed()

  .setTitle('Сообщение удалено')

  .setColor("#ff0000")

  .addField("Пользователь", msg.author.tag, true)

  .addField("Сервер", msg.guild.name, true)

  .addField("Текстовый канал", msg.channel.name, true);

  if(msg.content)

  e.addField("Сообщение", msg.content, true);

  else

  e.addField("Сообщение: ", "без сообщения", true);

  e.setTimestamp(new Date());

   msg.attachments.array().forEach(function(item, index, array) {

  e.attachFile(item.url);

   });

  bot.channels.get('434608685155614720').send({embed:e});

},



update: function(msgOld, msgNew, bot) {

  if(msgOld.content){

    let e = new Discord.RichEmbed()

    .setTitle(msgOld.author.tag + ' изменил сообщение')

    .setColor("#15f153")

    .addField("Сервер", msgOld.guild.name)

    .addField("Текстовый канал", msgOld.channel.name)

    .addField("Старое сообщение", msgOld.content)

    .addField("Новое сообщение", msgNew.content)

    .setTimestamp(new Date());



    bot.channels.get('434608641425932288').send({embed:e});

  }

},



command: function() {



},



join: function(member, bot) {

  let e = new Discord.RichEmbed()

  .setTitle(`member.user.tag` + ' зашёл на сервер')

  .setColor("#15f153")

  .addField("Сервер: " + member.guild.name, "Created at: " + member.user.createdAt)

  .setTimestamp(new Date());



  bot.channels.get('434608588153946123').send({embed:e});

},



leave: function(member, bot) {



  let e = new Discord.RichEmbed()

  .setTitle(`member.user.tag` + ' вышел с сервера')

  .setColor("#ff0000")

  .addField("Сервер: " + member.guild.name, "Created at: " + member.user.createdAt)

  .setTimestamp(new Date());



  bot.channels.get('434608588153946123').send({embed:e});

}



};
