import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './profile.schema';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // Create or update user profile
  @Post(':userId')
  async createOrUpdateProfile(
    @Param('userId') userId: string,
    @Body() profileData: Partial<Profile>
  ): Promise<Profile> {
    return this.profileService.createOrUpdateProfile(userId, profileData);
  }

  // Get user profile by ID
  @Get(':userId')
  async getProfile(@Param('userId') userId: string): Promise<Profile | null> {
    return this.profileService.getProfile(userId);
  }

  // Delete user profile (if needed)
  @Delete(':userId')
  async deleteProfile(@Param('userId') userId: string): Promise<{ message: string }> {
    await this.profileService.deleteProfile(userId);
    return { message: 'Profile deleted successfully' };
  }
}
