// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type ProductDocument = Product & Document;

// @Schema()
// export class Product {
//   @Prop({ required: true })
//   title: string;

//   @Prop({ required: true })
//   description: string;

//   @Prop({ required: true })
//   price: number;

//   @Prop()
//   imageUrl: string;

//   @Prop({ required: true, default: false })
//   deleted: boolean; // Soft delete flag
// }

// export const ProductSchema = SchemaFactory.createForClass(Product);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true }) // Automatically adds createdAt & updatedAt
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: false }) // Soft delete field
  isDeleted: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
