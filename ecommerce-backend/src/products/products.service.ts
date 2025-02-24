// // import { Injectable, NotFoundException } from '@nestjs/common';
// // import { InjectModel } from '@nestjs/mongoose';
// // import { Model } from 'mongoose';
// // import { Product, ProductDocument } from './product.schema';

// // @Injectable()
// // export class ProductsService {
// //   constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

// //   // ✅ Get All Products
// //   async getAllProducts(): Promise<Product[]> {
// //     return this.productModel.find().exec();
// //   }

// //   // ✅ Get Product by ID
// //   async getProductById(productId: string): Promise<Product> {
// //     const product = await this.productModel.findById(productId);
// //     if (!product) throw new NotFoundException('Product not found');
// //     return product;
// //   }

// //   // ✅ Add New Product
// //   async createProduct(productData: any): Promise<Product> {
// //     const newProduct = new this.productModel(productData);
// //     return newProduct.save();
// //   }

// //   // ✅ Update Product
// //   async updateProduct(productId: string, updateData: any): Promise<Product> {
// //     const updatedProduct = await this.productModel.findByIdAndUpdate(productId, updateData, { new: true });
// //     if (!updatedProduct) throw new NotFoundException('Product not found');
// //     return updatedProduct;
// //   }

// //   // ✅ Delete Product
// //   async deleteProduct(productId: string): Promise<{ message: string }> {
// //     const deletedProduct = await this.productModel.findByIdAndDelete(productId);
// //     if (!deletedProduct) throw new NotFoundException('Product not found');
// //     return { message: 'Product deleted successfully' };
// //   }
// // }
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Product, ProductDocument } from './product.schema';

// @Injectable()
// export class ProductsService {
//   constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

//   // ✅ Get All Active Products (Only Non-Deleted)
//   // async getAllProducts(): Promise<Product[]> {
//   //   return this.productModel.find({ deleted: false }).exec();
//   // }
//   async getAllProducts(): Promise<Product[]> {
//     return this.productModel.find({ isDeleted: false }).exec();
//   }
  

//   // ✅ Get Product by ID (Check if not soft-deleted)
//   async getProductById(productId: string): Promise<Product> {
//     const product = await this.productModel.findById(productId);
//     if (!product || product.deleted) throw new NotFoundException('Product not found');
//     return product;
//   }

//   // ✅ Add New Product
//   async createProduct(productData: any): Promise<Product> {
//     const newProduct = new this.productModel(productData);
//     return newProduct.save();
//   }

//   // ✅ Update Product
//   async updateProduct(productId: string, updateData: any): Promise<Product> {
//     const updatedProduct = await this.productModel.findByIdAndUpdate(productId, updateData, { new: true });
//     if (!updatedProduct) throw new NotFoundException('Product not found');
//     return updatedProduct;
//   }

//   // ✅ Soft Delete Product (Mark as deleted)
//   async softDeleteProduct(productId: string): Promise<{ message: string }> {
//     const product = await this.productModel.findByIdAndUpdate(productId, { deleted: true }, { new: true });
//     if (!product) throw new NotFoundException('Product not found');
//     return { message: 'Product soft deleted successfully' };
//   }

//   // ✅ Restore Soft Deleted Product
//   async restoreProduct(productId: string): Promise<Product> {
//     const product = await this.productModel.findByIdAndUpdate(productId, { deleted: false }, { new: true });
//     if (!product) throw new NotFoundException('Product not found');
//     return product;
//   }

//   // ✅ Permanently Delete Product
//   async deleteProductPermanently(productId: string): Promise<{ message: string }> {
//     const deletedProduct = await this.productModel.findByIdAndDelete(productId);
//     if (!deletedProduct) throw new NotFoundException('Product not found');
//     return { message: 'Product permanently deleted' };
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  // ✅ Get All Products (With Pagination & Exclude Soft Deleted)
  async getAllProducts(page: number = 1, limit: number = 6) {
    const skip = (page - 1) * limit;
  
    // Fetch products excluding soft-deleted ones
    const products = await this.productModel
      .find({ isDeleted: false })
      .skip(skip)
      .limit(limit)
      .exec();
  
    // Count total products
    const total = await this.productModel.countDocuments({ isDeleted: false });
  
    return {
      products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
  

  // ✅ Get Product by ID (Exclude Soft Deleted)
  async getProductById(productId: string): Promise<Product | null> {
    return this.productModel.findOne({ _id: productId, isDeleted: false }).exec();
  }

  // ✅ Create Product
  async createProduct(productData: any): Promise<Product> {
    const newProduct = new this.productModel(productData);
    return newProduct.save();
  }

  // ✅ Update Product
  async updateProduct(productId: string, updateData: any): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(productId, updateData, { new: true }).exec();
  }

  // ✅ Soft Delete Product (Set `isDeleted: true`)
  async softDeleteProduct(productId: string): Promise<{ message: string }> {
    await this.productModel.findByIdAndUpdate(productId, { isDeleted: true }).exec();
    return { message: 'Product soft deleted successfully' };
  }

  // ✅ Restore Soft Deleted Product
  async restoreProduct(productId: string): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(productId, { isDeleted: false }, { new: true }).exec();
  }

  // ✅ Permanently Delete Product
  async deleteProductPermanently(productId: string): Promise<{ message: string }> {
    await this.productModel.findByIdAndDelete(productId).exec();
    return { message: 'Product permanently deleted' };
  }
}
