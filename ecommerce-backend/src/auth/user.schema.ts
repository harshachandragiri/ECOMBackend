import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './roles.enum';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: Role, default: Role.User }) // Default role is "user"
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
