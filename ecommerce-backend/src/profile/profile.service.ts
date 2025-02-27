import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './profile.schema';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) {}

  // Create or update user profile
  async createOrUpdateProfile(userId: string, profileData: Partial<Profile>): Promise<Profile> {
    try {
      return await this.profileModel.findOneAndUpdate(
        { userId },
        { $set: profileData },
        { new: true, upsert: true }
      );
    } catch (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }
  }

  // Get user profile by ID
  async getProfile(userId: string): Promise<Profile | null> {
    try {
      const profile = await this.profileModel.findOne({ userId }).exec();
      if (!profile) {
        throw new NotFoundException('Profile not found');
      }
      return profile;
    } catch (error) {
      throw new Error(`Failed to fetch profile: ${error.message}`);
    }
  }

  // Delete user profile by ID
  async deleteProfile(userId: string): Promise<void> {
    try {
      const result = await this.profileModel.deleteOne({ userId }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('Profile not found');
      }
    } catch (error) {
      throw new Error(`Failed to delete profile: ${error.message}`);
    }
  }
}
