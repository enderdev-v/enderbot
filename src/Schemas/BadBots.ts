import { Document, Schema, model } from 'mongoose';

const BadBots = new Schema({
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

interface Bots extends Document {
  guild: string;
  bots: string[];
}

export default model<Bots>('BadBotsSchema', BadBots);