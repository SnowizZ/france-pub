const fs = require('fs') 

module.exports = {
    run: async (message,args, client) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('🛑`Erreur :`\n - **Vous devez avoir la permission :** `Gérer les messages`\n **Afin de pouvoir effectuer cette commande.**')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('🛑`Erreur :`\n**Veuillez mentionner la personne à UnWarn**.')
        if (!client.db.warns[member.id]) return message.channel.send('**Ce membre n\'a aucun warn.**')
        const warnIndex = parseInt(args[1], 10) - 1
        if (warnIndex < 0 || !client.db.warns[member.id][warnIndex]) return message.channel.send('🛑`Erreur :`\n**Ce warn n\'éxiste pas.**')
        const { reason } = client.db.warns[member.id].splice(warnIndex, 1)[0]
        if (!client.db.warns[member.id].length) delete client.db.warns[member.id]
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.channel.send(`${member}** a été Unwarn pour **${reason}`)

    },
    name: 'unwarn',
    guildOnly: true,
    help: {
        description : '**Unwarn un membre du serveur.**',
        syntax: '<@membre> [Numéro de Warn]'
    }
}