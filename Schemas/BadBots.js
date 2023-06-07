const { Schema, model } = require(`mongoose`) 
  
 const BadBots = new Schema({ 
   guild: {
		 type: String,
		 required: true
	 },
   Bots: { 
     type: Array, 
     required: true, 
     default: [] 
   } 
 }) 
  
 module.exports = model(`BadBotsSchema`, BadBots)