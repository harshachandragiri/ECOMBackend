import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result; // ✅ Ensure it includes role
    }
    return null;
  }
  // async login(user: any) {
  //   console.log("User data from DB before generating token:", user); // Debugging
  //   if (!user.role) {
  //     throw new Error("User role is undefined. Check MongoDB data.");
  //   }
  
  //   const payload = { email: user.email, role: user.role };
  //   const token = this.jwtService.sign(payload);
  
  //   console.log("Generated Token:", token); // Debugging
  //   return { access_token: token };
  // }
  

  async login(user: any) {
    console.log(user);
    const payload = { email: user.email, role: user.role };
    console.log(user.role);
    return {
      access_token: this.jwtService.sign(payload),

    };
  }
}
