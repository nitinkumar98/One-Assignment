import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { AuthGuard } from '../guards/auth.guards';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Post()
  createProduct(@Body() body: any) {
    return this.productsService.createProduct(body);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Patch(':id')
  udpateProductById(@Param('id') id: string, @Body() body: any) {
    return this.productsService.updateProduct(id, body);
  }

  @Delete(':id')
  deleteProductById(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
