const Discord = require('discord.js')
const { QuickDB } = require('quick.db')
const db = new QuickDB()
const ms = require('ms')
const { ActivityType } = require('discord.js');
const config = require("./config.json")
const client = new Discord.Client({ 
  intents: [3243773]});

module.exports = client

client.on('messageCreate', message => {
  if (message.mentions.has(client.user)) {
    message.reply('Olá! alguém me mencionou?');
  }
});

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){
      const cmd = client.slashCommands.get(interaction.commandName);
      if (!cmd) return interaction.reply(`Error`);
      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
    console.log(`Sistema de Música feito por Roger Menezes!`);
    client.user.setPresence({
      activities: [{ name: `Bar da Agueda`, url: `https://www.twitch.tv/discord`, type: ActivityType.Streaming }],
      status: 'idle',
    });
})  
  
client.slashCommands = new Discord.Collection()
require('./handler')(client)
client.login(config.token)