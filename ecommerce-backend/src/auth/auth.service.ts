import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; 
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/users/user.schema';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // ✅ Inject UsersService
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log("🔍 Validating user:", email);

    // Fetch user from MongoDB
    const user = await this.usersService.findOne(email);  
    console.log("✅ User fetched from DB:", user);

    if (!user) {
        console.log("❌ User not found in DB!");
        return null;
    }

    // Check if user has an `_id`
    if (!user._id) {
        console.log("❌ User object does not contain _id. Check MongoDB.");
    }

    // Compare password
    const isMatch = await bcrypt.compare(pass, user.password);
    console.log(isMatch);
    if (!isMatch) {
        console.log("❌ Password does not match!");
        return null;
    }

    console.log("✅ Returning user with ID:", user._id?.toString());
    return { _id: user._id?.toString(), email: user.email, role: user.role };
}


  async login(user: any) {
    console.log("Logging in user:", user);

    const verifyUser = await this.validateUser(user.email , user.password);
    
    if(!verifyUser){
      throw new UnauthorizedException;
    }

    const userData = await this.usersService.findOne(user.email); 

  
    if (!userData || !userData._id) {
      console.log("❌ Error: userID is absent");
      throw new Error("userID is absent in login function");
    }

    

    const payload = { id: userData._id, email: userData.email, role: userData.role };
    console.log("✅ Generated JWT Payload:", payload);

    return {
      role: userData.role,
      access_token: this.jwtService.sign(payload),
    };
  }
}
