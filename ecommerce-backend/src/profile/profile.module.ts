import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile, ProfileSchema } from './profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }])
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService], // Exporting for potential usage in other modules
})
export class ProfileModule {}
