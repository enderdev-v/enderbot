import { Document, Schema, model } from 'mongoose';

const logs = new Schema({
	guild: {
		type: String,
		required: true
	},
	channelId: {
		type: String,
		required: true,
		default: []
	}
});

interface Ilogs extends Document {
  guild: string;
  channelId: string;
}

export default model<Ilogs>('logsSchema', logs);