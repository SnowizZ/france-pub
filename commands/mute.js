module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('🛑`Erreur :`\n**-Vous devez avoir la permission `Gérer les messages`**\n**Pour utiliser cette commande.**')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('🛑`Erreur`\n**Veuillez mentionner le membre à mute.**')
        if (member.id === message.guild.ownerID) return message.channel.send('🛑`Erreur :`\n**Vous ne pouvez mute le propriétaire du serveur.**')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('🛑`Erreur :`\n**Vous ne pouver pas mute ce membre.**')
        if (!member.manageable) return message.channel.send('🛑`Erreur :`\n**Le bot ne peut pas mute ce membre.**')
        const reason = args.slice(1).join(' ') || '**Aucune raison fournie.'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    permissions: 0
                }
            })
            message.guild.channel.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false 
            }))
        }
        await member.roles.add(muteRole)
        message.channel.send(`${member} **à bien été mute !** 🗯️`)

    },
    name: 'mute',
    guildOnly: true,
    help: {
        description : '**Permet de mute une personne.**',
        syntax: '<@membre> [Raison]'
    }
}