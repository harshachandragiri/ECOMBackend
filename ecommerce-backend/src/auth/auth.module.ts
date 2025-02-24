import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
  
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // Update later with .env
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy,UsersService],
})
export class AuthModule {}
