import * as mongoose from 'mongoose';

interface User extends mongoose.Document {
  username: string;
  password: string;
  salt: string;
}

const schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
});

const UserModel = mongoose.model<User>('User', schema);

export default UserModel;
