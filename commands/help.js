const Discord = require('discord.js')

module.exports = {
    run: message => {
        message.channel.send(new Discord.MessageEmbed()
        .setAuthor('Menu d\'aide', 'https://media.discordapp.net/attachments/764214207653609502/799413663710707742/image0-1.jpg')
        .setColor('#FF0000')
        .setDescription(`**Voici les commandes disponnibles pour le bot :** \`France Pub\`\n **Le préfix du bot est :**\`p!\` `)
        .addField('**Commandes Membres :**\n \`help\` \`test\`')
        .addField('**Commandes pour Admin :**\n \`ban\` \`clear\` \`infractions\` \`kick\` \`mute\` \`tempban\` \`tempmute\` \`unmute\` \`warn\` \`unwarn\` ')
        .setFooter('Menu d\'aide ')
        .setTimestamp ()
        .setURL ('https://discord.gg/dh6FQ8GRzP') )
    },
    name: 'help'
}
