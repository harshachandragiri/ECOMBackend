// import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
// import { ProductsService } from './products.service';
// import { Product } from './product.schema';

// @Controller('products')
// export class ProductsController {
//   constructor(private readonly productsService: ProductsService) {}

//   // ✅ Get All Products
//   @Get()
//   getAllProducts(): Promise<Product[]> {
//     return this.productsService.getAllProducts();
//   }

//   // ✅ Get Product by ID
//   @Get(':id')
//   getProductById(@Param('id') productId: string): Promise<Product> {
//     return this.productsService.getProductById(productId);
//   }

//   // ✅ Add New Product
//   @Post()
//   createProduct(@Body() productData: any): Promise<Product> {
//     return this.productsService.createProduct(productData);
//   }

//   // ✅ Update Product
//   @Put(':id')
//   updateProduct(@Param('id') productId: string, @Body() updateData: any): Promise<Product> {
//     return this.productsService.updateProduct(productId, updateData);
//   }

//   // ✅ Delete Product
//   @Delete(':id')
//   deleteProduct(@Param('id') productId: string): Promise<{ message: string }> {
//     return this.productsService.deleteProduct(productId);
//   }
// }
// import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
// import { ProductsService } from './products.service';
// import { Product } from './product.schema';
// import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from '../auth/roles.guard';
// import { Roles } from '../auth/roles.decorator';
// import { Role } from 'src/auth/roles.enum';

// @Controller('products')
// export class ProductsController {
//   constructor(private readonly productsService: ProductsService) {}

//   // ✅ Get All Active Products
//   @Get()
//   getAllProducts(): Promise<Product[]> {
//     return this.productsService.getAllProducts();
//   }

//   // ✅ Get Product by ID
//   @Get(':id')
//   getProductById(@Param('id') productId: string): Promise<Product> {
//     return this.productsService.getProductById(productId);
//   }

//   // ✅ Add New Product (Admin Only)
//   @Post()
//   @UseGuards(AuthGuard(), RolesGuard)
//   @Roles(Role.Admin)
//   createProduct(@Body() productData: any): Promise<Product> {
//     return this.productsService.createProduct(productData);
//   }

//   // ✅ Update Product (Admin Only)
//   @Put(':id')
//   @UseGuards(AuthGuard(), RolesGuard)
//   @Roles(Role.Admin)
//   updateProduct(@Param('id') productId: string, @Body() updateData: any): Promise<Product> {
//     return this.productsService.updateProduct(productId, updateData);
//   }

//   // ✅ Soft Delete Product (Admin Only)
//   @Delete(':id')
//   @UseGuards(AuthGuard(), RolesGuard)
//   @Roles(Role.Admin)
//   softDeleteProduct(@Param('id') productId: string): Promise<{ message: string }> {
//     return this.productsService.softDeleteProduct(productId);
//   }

//   // ✅ Restore Soft Deleted Product (Admin Only)
//   @Put('restore/:id')
//   @UseGuards(AuthGuard(), RolesGuard)
//   @Roles(Role.Admin)
//   restoreProduct(@Param('id') productId: string): Promise<Product> {
//     return this.productsService.restoreProduct(productId);
//   }

//   // ✅ Permanently Delete Product (Admin Only)
//   @Delete('permanent/:id')
//   @UseGuards(AuthGuard(), RolesGuard)
//   @Roles(Role.Admin)
//   deleteProductPermanently(@Param('id') productId: string): Promise<{ message: string }> {
//     return this.productsService.deleteProductPermanently(productId);
//   }
// }
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.schema';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ✅ Get All Active Products (Exclude Soft Deleted)
  @Get()
  async getAllProducts(): Promise<Product[] | unknown> {
    return this.productsService.getAllProducts();
  }

  // ✅ Get Product by ID (Exclude Soft Deleted)
  @Get(':id')
  async getProductById(@Param('id') productId: string): Promise<Product | null> {
    return this.productsService.getProductById(productId);
  }

  // ✅ Add New Product (Admin Only)
  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin)
  async createProduct(@Body() productData: any): Promise<Product> {
    return this.productsService.createProduct(productData);
  }

  // ✅ Update Product (Admin Only)
  @Put(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin)
  async updateProduct(@Param('id') productId: string, @Body() updateData: any): Promise<Product | null> {
    return this.productsService.updateProduct(productId, updateData);
  }

  // ✅ Soft Delete Product (Admin Only)
  @Delete(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin)
  async softDeleteProduct(@Param('id') productId: string): Promise<{ message: string }> {
    return this.productsService.softDeleteProduct(productId);
  }

  // ✅ Restore Soft Deleted Product (Admin Only)
  @Put('restore/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin)
  async restoreProduct(@Param('id') productId: string): Promise<Product | null> {
    return this.productsService.restoreProduct(productId);
  }

  // ✅ Permanently Delete Product (Admin Only)
  @Delete('permanent/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(Role.Admin)
  async deleteProductPermanently(@Param('id') productId: string): Promise<{ message: string }> {
    return this.productsService.deleteProductPermanently(productId);
  }
}


