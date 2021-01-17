module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('🛑`Erreur :`\n**-Vous devez avoir la permission `Gérer les messages`**\n**Pour utiliser cette commande.**')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('🛑`Erreur`\n**Veuillez mentionner le membre à unmute.**')
        if (member.id === message.guild.ownerID) return message.channel.send('🛑`Erreur :`\n**Vous ne pouvez mute le propriétaire du serveur.**')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('🛑`Erreur :`\n**Vous ne pouver pas unmute ce membre.**')
        if (!member.manageable) return message.channel.send('🛑`Erreur :`\n**Le bot ne peut pas unmute ce membre.**')
        const reason = args.slice(1).join(' ') || '**Aucune raison fournie.'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) return message.channel.send('🛑`Erreur :`\n**Il n\'y a pas de muterole.**')
        await member.roles.add(muteRole)
        message.channel.send(`${member} **à bien été unmute !** 🗯️`)

    },
    name: 'unmute',
    guildOnly: true,
    help: {
        description : '**Permet d\'unmute un membre**.',
        syntax: '<@membre> '
    }
}