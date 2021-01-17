const fs = require('fs') 

module.exports = {
    run: async (message,args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('🛑`Erreur :`\n - **Vous devez avoir la permission :** `Gérer les messages`\n **Afin de pouvoir effectuer cette commande.**')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('🛑`Erreur :`\n**Veuillez mentionner la personne à Warn**.')
        if (member.id === message.guild.ownerID) return message.channel.send('🛑`Erreur :`\n**Vous ne pouvez pas warn le propriétaire du serveur.**')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('🛑`Erreur :`\n**Vous ne pouvez pas warn ce membre.**')
        const reason = args.slice(1).join(' ')
        if (!reason) return message.channel.send('🛑`Erreur :`\n**Veuillez indiquer une raison.**')
        if (!client.db.warns[member.id]) client.db.warns[member.id] = []
        client.db.warns[member.id].unshift({
            reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(`${member}** a été Warn pour **${reason}`)
        
    },
    name: 'warn',
    guildOnly: true,
    help: {
        description : '**Avertit un membre du serveur.**',
        syntax: '<@membre> [Raison]'
    }
}