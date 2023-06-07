const BadBots = require("../../Schemas/BadBots")
module.exports = {
	name: "GuildMemberAdd",
	async run(client, member) {
	        let data = await BadBots.findOne({ guild: member.guild.id })  
  
     if(!data) return;

  if(data.Bots.includes(member.id)) {
      await member.ban(executor, { reason: 'Raid.' }).catch(e => {});
      } 

	}
}