import { Schema, Document, Model, Connection } from 'mongoose';

export interface IProducts extends Document {
  id: string;
  name: string;
  title: string;
  descripton: string;
  addedAt: number;
  deletedAt: number;
  updatedAt: number;
}

const ProductsSchema = new Schema({
  id: { type: String, index: true, required: true },
  name: { type: String },
  title: { type: String },
  descripton: { type: String },
  addedAt: { type: Number },
  deletedAt: { type: Number },
  updatedAt: { type: Number },
});

export type IProductsModel = Model<IProducts>;

export const productModelFn = (conn: Connection) =>
  conn.model<IProducts>('Products', ProductsSchema, 'products');
