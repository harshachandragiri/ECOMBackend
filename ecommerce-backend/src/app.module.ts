import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
// import { OrdersService } from './orders/orders.service';
// import { OrdersController } from './orders/orders.controller';
// import { OrdersModule } from './orders/orders.module';
import { OrdersModule } from './orders/orders.module';
import { ProfileModule } from './profile/profile.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
     PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forRoot('mongodb://localhost:27017/ecommerce'), // Update later for online MongoDB
    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    ProfileModule,
  
  ],
  controllers:[AppController, ProductsController,],
  providers:[AppService, ProductsService,],
})
export class AppModule {}
