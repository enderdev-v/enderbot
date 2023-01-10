const Discord = require(`discord.js`);
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
const mongo = require("mongoose")
const chalk = require('chalk');
const keepAlive = require('./server.js');
const express = require("express")().get("/", (req,res)=>res.send("enderbot listo")).listen(3000)

// handler

const fs = require("fs")
let { readdirSync } = require("fs")
const path = require(`path`)

client.commands = new Discord.Collection()

const commands = fs.readdirSync(path.join(__dirname, `comandos`))
for (const folders of commands) {
	const folder = fs.readdirSync(path.join(__dirname, `comandos`, folders))
	for (const file of folder) {
		const cmd = require(path.join(__dirname, `comandos`, folders, file))
		client.commands.set(cmd.name, cmd);
	}
}

// MongoDB

mongo.connect(process.env.MongoDB, { 
         useNewUrlParser: true,  
         useUnifiedTopology: true,
 }).then(() => { 
         console.log(chalk.bold.green`conectado correctamente a Mongo DB`) 
 }).catch((e) => { 
         console.log(chalk.italic.red`ocurrió un error al conectarse a MongoDB : ${e}`) 
    
 })

/*


client.on("debug", ( e ) => console.log(e));
client.once("ready", () => console.log("enderbot ready"))

*/


// event handler

const events = fs.readdirSync(path.join(__dirname, `eventos`))
for (const file of events) {
	const event = require(path.join(__dirname, `eventos`, file))
	client.on(event.name, async (...args) => event.run(client, ...args));
}


// Distube

const { DisTube } = require('distube');
client.distube = new DisTube(client, {
	emitNewSongOnly: true,
	leaveOnStop: false,
	leaveOnFinish: false,
	leaveOnEmpty: true,
	youtubeDL: false,
	ytdlOptions: {
		highWaterMark: 1024 * 1024 * 64,
		quality: "highestaudio",
		format: "audioonly",
		liveBuffer: 60000,
		dlChunkSize: 1024 * 1024 * 4,
	},
})

client.distube.on("playSong", async (queue, song) => {

	queue.textChannel.send(`Reproduciondo ahora. ${song.name}`)
});

client.distube.on("addSong", async (queue, song) => {

	queue.textChannel.send(`Cancion añadida: ${song.name}`)

});

 
process.on('unhandledRejection', error => {
    console.error(error);
});

client.login(process.env.token)
console.log(chalk.bold.cyan`Iniciado con ${process.version}`)