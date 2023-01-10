const chalk = require('chalk');

module.exports = {
	name: `ready`,
	run(client) {
    let activity = [`Counting Stars`, `Cloud 9`, `I'm Still Standing`]

    setInterval(() => {
      function presence() {
     client.user.setPresence({
       status: "online",
       activities: [{
         name: activity[Math.floor(Math.random() * activity.length)],
	       type: `LISTENING`
        }] 
      })
    } 
      presence()
    }, 50000)
		

    console.log(chalk.italic.cyan`enderbot listo`)
    
		
	}
}