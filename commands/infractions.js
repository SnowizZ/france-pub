const moment = require('moment') 
Discord = require('discord.js')

moment.locale('fr')
module.exports = {
    run: async (message,args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('🛑`Erreur :`\n - **Vous devez avoir la permission :** `Bannir des Membres`\n **Afin de pouvoir effectuer cette commande.**')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('🛑`Erreur :`\n**Veuillez mentionner la personne pour voir ces Warn(s).**.')
        if (!client.db.warns[member.id]) return message.channel.send('**Ce membre n\'a aucun Warn**')
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`** Total des Warns :** ${client.db.warns[member.id].length}\n\n __**10 derniers Warns**__\n\n${client.db.warns[member.id].slice(0, 10).map((warn, i) => `**${i + 1}.** ${warn.reason}\nSanctionné ${moment(warn.date).fromNow()} par <@!${warn.mod}>`).join('\n\n')}`))

    },
    name: 'infractions',
    guildOnly: true,
    help: {
        description : '**Permet de voir les infractions d\'un membre',
        syntax: '<@membre>'
    }
}