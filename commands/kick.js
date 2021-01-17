module.exports = {
    run: async (message,args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('🛑`Erreur :`\n - **Vous devez avoir la permission :** `Expulser des Membres`\n **Afin de pouvoir effectuer cette commande.**')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('🛑`Erreur :`\n**Veuillez mentionner la personne à exclure**.')
        if (member.id === message.guild.ownerID) return message.channel.send('🛑`Erreur :`\n**Vous ne pouvez pas exclure le propriétaire du serveur.**')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('🛑`Erreur :`\n**Vous ne pouvez pas exclure ce membre.**')
        if (!member.kickable) return message.channel.send('🛑`Erreur :`\n**Le bot ne peut pas exclure ce membre/**')
        const reason = args.slice(1).join(' ') || 'Aucune raison fournie.'
        await member.kick(reason)
        message.channel.send(`${member.user.tag} **à bien été exclu !**💨 `)
        member.send('**Tu as été Kick de `Welak`**💨\n *Si tu pense que ceci est une erreur merci de contacter via mp #Sn0wYzZ#0001*').catch(() => {})


    },
    name: 'kick',
    guildOnly: true,
    help: {
        description : '**Exclue un membre du serveur.**',
        syntax: '<@membre> [Raison]'
    }
}