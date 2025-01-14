import { Document, Schema, model } from 'mongoose';

const PassUsers = new Schema({
	guild: {
		type: String,
		required: true
	},
	users: {
		type: Array,
		required: true,
		default: []
	}
});

interface IPassUsers extends Document {
  guild: string;
  users: string[];
}

export default model<IPassUsers>('PassUsersSchema', PassUsers);