import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { DATABASE_PROVIDERS } from '../constants';
import { IProductsModel } from '../models/products.model';
const randomstring = require('randomstring');

@Injectable()
export class ProductsService {
  constructor(
    @Inject(DATABASE_PROVIDERS.PRODUCTS_MODEL)
    private productModel: IProductsModel,
  ) {}

  public async createProduct(body: any): Promise<{ message: string }> {
    await new this.productModel({
      id: randomstring.generate(7),
      name: body.name,
      title: body.title,
      descripton: body.descripton,
      addedAt: Date.now(),
      deletedAt: Date.now(),
      updatedAt: Date.now(),
    }).save();
    return { message: 'Product added successfully' };
  }

  private async getProductData(id: string) {
    const product = await this.productModel.findOne({ id }, { __v: 0, _id: 0 });

    if (!product) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  public async getProduct(id: string) {
    await this.getProductData(id);
    return { message: 'Products sent successfully' };
  }

  public async updateProduct(id: string, updatedData: any) {
    console.log('updatedDta', updatedData);
    await this.getProductData(id);
    await this.productModel.findOneAndUpdate(
      { id },
      { ...updatedData, updatedAt: Date.now() },
    );
    return { message: 'Product updated successfully' };
  }

  public async deleteProduct(id: string) {
    await this.getProductData(id);
    await this.productModel.findOneAndDelete({ id });
    return { message: 'Product deleted successfully' };
  }
}
