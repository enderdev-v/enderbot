import { Document, Schema, model } from 'mongoose';

const PassBots = new Schema({
	guild: {
		type: String,
		required: true
	},
	bots: {
		type: Array,
		required: true,
		default: []
	}
});

interface IPassBots extends Document {
  guild: string;
  bots: string[];
}

export default model<IPassBots>('PassBotaSchema', PassBots);