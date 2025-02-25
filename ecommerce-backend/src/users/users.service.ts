import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: any): Promise<User> {
    return this.userModel.create(userDto);
  }

  async findOne(email: string): Promise<any> {
    console.log("Searching for user with email:", email);
    const user = await this.userModel.findOne({email});
    if(!user){
      console.log("user Not found in user service");
    }
    console.log("✅ Fetched User Data from DB:", user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
