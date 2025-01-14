import { Document, Schema, model } from 'mongoose';

const PassChannels = new Schema({
	guild: {
		type: String,
		required: true
	},
	channels: {
		type: Array,
		required: true,
		default: []
	}
});

interface IPassChannels extends Document {
  guild: string;
  channels: string[];
}

export default model<IPassChannels>('PassChannelsSchema', PassChannels);