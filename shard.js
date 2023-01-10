 const { ShardingManager } = require("discord.js");
const chalk = require("chalk")
const mySecret = process.env['token']

let manager = new ShardingManager('./index.js', {
  token: mySecret,
  totalShard: "auto",
  respawn: true,
})

// Emitted when a shard is created
manager.on("shardCreate", async (shard) => {

  console.log(chalk.bold.cyan`Shards:` + chalk.bold.green` ${shard.id} lanzada`)

  shard.on('error', (error) => {
     console.error(error) 
  })
    shard.on('death', (a, b) => {
        console.log('Shard died')
        console.log(a)
        console.log(b)
    })
  
});

// Spawn your shards
manager.spawn({ amount: 'auto', delay: 15500, timeout: 60000 }).catch(e => console.log(e))
