import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
export class UsersController {
  @Get('profile')
  @UseGuards(AuthGuard('jwt')) // Protect with JWT
  getProfile(@Req() req) {
    return req.user;
  }

  @Get('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard) // Protect with JWT & Role Guard
  @Roles(Role.Admin) // Only Admins can access
  getAdminData() {
    return { message: 'This is an admin-only route' };
  }
}
