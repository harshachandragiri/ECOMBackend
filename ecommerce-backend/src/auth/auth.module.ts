// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { UsersModule } from '../users/users.module';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './jwt.strategy';
// import { UsersService } from 'src/users/users.service';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     ConfigModule,// ✅ Load .env variables
//     UsersModule,
//     PassportModule,
//     // JwtModule.register({
//     //   secret: process.env.JWT_SECRET || "Harsha@1234" , // Update later with .env
//     //   signOptions: { expiresIn: '1h' },
//     // }),
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => {
//         const secret = configService.get<string>('JWT_SECRET');
//         console.log("JWT_SECRET:", secret); // ✅ Log here
//         return {
//           secret,
//           signOptions: { expiresIn: '1h' },
//         };
//       },
//     }),
    
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy,UsersService],
// })
// export class AuthModule {
  
// }
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // ✅ Import MongooseModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from '../users/user.schema'; // ✅ Import User Schema

@Module({
  imports: [
    ConfigModule, // ✅ Load .env variables
    UsersModule,
   PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // ✅ Register UserModel
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        console.log("JWT_SECRET:", secret); // ✅ Log here
        return {
          secret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService],
  exports: [AuthService], // ✅ Export AuthService for use in other modules
})
export class AuthModule {}

