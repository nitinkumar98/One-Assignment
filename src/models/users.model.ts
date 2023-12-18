import { Schema, Document, Model, Connection } from 'mongoose';

import { UserType } from '../enums';

export interface IUsers extends Document {
  userId: string;
  username: string;
  password: string;
  userType: string;
  permission: [];
}

const UsersSchema = new Schema({
  userId: { type: String, index: true },
  username: { type: String },
  password: { type: String },
  userType: { type: String, enum: UserType },
  permission: [],
});

UsersSchema.index({ username: 1, password: 1});

export type IUsersModel = Model<IUsers>;

export const usersModelFn = (conn: Connection) =>
  conn.model<IUsers>('Users', UsersSchema, 'users');
