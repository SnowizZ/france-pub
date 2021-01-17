

module.exports = {
    run: async (message,args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('🛑`Erreur :`\n - **Vous devez avoir la permission :** `Bannir des Membres`\n **Afin de pouvoir effectuer cette commande.**')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('🛑`Erreur :`\n**Veuillez mentionner la personne à Bannir**.')
        if (member.id === message.guild.ownerID) return message.channel.send('🛑`Erreur :`\n**Vous ne pouvez pas bannir le propriétaire du serveur.**')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('🛑`Erreur :`\n**Vous ne pouvez pas Bannir ce membre.**')
        if (!member.bannable) return message.channel.send('🛑`Erreur :`\n**Le bot ne peut pas Bannir ce membre/**')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie.'
        await member.ban({reason})
        message.channel.send(`${member.user.tag} **à bien été Banni !**💨 `)


    },
    name: 'ban',
    guildOnly: true,
    help: {
        description : '**Banni un membre**',
        syntax: '<@membre> [Raison]'
    }
}