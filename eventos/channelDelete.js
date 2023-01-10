const Discord = require("discord.js")

module.exports = {
  name: "channelDelete",
  async run(client, channel) {
    client.channels.cache.get("1049143528007159928").send(`canal ${channel.name} ha sido eliminado`)

  const logs = await channel.guild.fetchAuditLogs({
		limit: 1,
		type: 'DELETE_CHANNEL',
	});

  const canal = logs.entries.first();

  const { executor, target } = canal;

    if (!canal) return;
    if (!executor.bot) return;
    if (executor.id === "862905211001503774") return;

     await channel.guild.members.ban(executor, { reason: 'Raid.' }).catch(e => {});
  
 }
}