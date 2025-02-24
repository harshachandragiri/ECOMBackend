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

  // async findOne(email: string): Promise<User | null> {
  //   return this.userModel.findOne({ email }).exec();
  // }
  // async findOne(email: string): Promise<any> {
  //   const user = await this.userModel.findOne({ email }).select("+role").exec();
  //   console.log("Fetched User Data from DB:", user); // Debugging
  //   return user;
  // }
  // async findOne(email: string): Promise<any> {
  //   const user = await this.userModel.findOne({ email }).select("email password role").exec();
  //   console.log("Fetched User Data from DB:", user); // Debugging
  //   return user;
  // }
  
  
  

  async findOne(email: string): Promise<any> {
    console.log(email);
    const user = await this.userModel.findOne({ email }).exec();
    console.log("Fetched User Data from DB:", user); // Debugging
    return user;
  }
  

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
  
}
