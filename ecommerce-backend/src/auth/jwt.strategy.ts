// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: 'SECRET_KEY', // Update this later with .env
//     });
//   }

//   async validate(payload: any) {
//     return { email: payload.email, role: payload.role };
//   }
// }
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.model';
import { jwtConstants } from './constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel('User') private userModel: Model<User> // ✅ Correct usage
      ) 
       {
    super({
      jwtFromRequest: (req) => req?.cookies?.jwt || null, // Extract token from cookies
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userModel.findById(payload.sub).exec(); // ✅ Use `userModel`

    if (!user) {
      throw new Error('User not found');
    }

    return { userId: user._id, email: user.email, role: user.role };
  }
}
