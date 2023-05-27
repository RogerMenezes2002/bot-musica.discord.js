const { DisTube } = require('distube');
const Discord = require('discord.js');

module.exports = {
  name: 'play',
  description: '🎶 [Music] - Reproduz uma música.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'musica',
      type: Discord.ApplicationCommandOptionType.String,
      description: '🎶 [Music] - URL da música a ser reproduzida:',
      required: true,
    },
  ],
  run: async (client, interaction) => {

    const musica = interaction.options.getString('musica');
    const distube = new DisTube(interaction.client, { searchSongs: 1, searchCooldown: 30, leaveOnEmpty: false, leaveOnFinish: false, leaveOnStop: false, });
    const queue = distube.getQueue(interaction.guildId);

    if (!interaction.member.voice.channel) {
      return interaction.reply({
        content: `:x: | **${interaction.user.username}**, você precisa estar em um canal de voz para usar este comando.`,
        ephemeral: true,
      });
    }

    const link = new Discord.ButtonBuilder()
      .setLabel('Clique aqui para acessar o link da música')
      .setStyle("Link")
      .setEmoji('🔗')
      .setURL(`${musica}`)

    const arrow = new Discord.ActionRowBuilder()
      .addComponents(link)

    if (!queue) {
      distube.play(interaction.member.voice.channel, musica);
      interaction.reply({ content: `🎶 | ***${interaction.user.username}***, entrei no canal **${interaction.member.voice.channel}** tocando a música **${musica}**!` }).then(() => {
        const embed1 = new Discord.EmbedBuilder()
          .setColor('#2f3136')
          .setTitle('Música adicionada na fila!')
          .setDescription(`\`🎵\` Com grande prazer, informo que a música **${musica}** que você selecionou foi devidamente **adicionada à nossa fila** de reprodução.\n\n\`🧃\`Com isso, estamos garantindo que a sua seleção receberá a devida atenção e será **tocada em breve**, proporcionando um momento único de deleite musical.`)
          .setFooter({ text: `© ${client.user.username} ${new Date().getFullYear()} | Feito por: Roger Menezes`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

        interaction.channel.send({ embeds: [embed1], components: [arrow] });
      })
    }
  },
};

const process = require('node:process');

process.on('unhandledRejection', (reason, promise) => {
  console.log('Rejeição não tratada em:', promise, 'razão:', reason);
});