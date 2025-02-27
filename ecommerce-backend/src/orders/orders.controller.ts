import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async placeOrder(@Body() orderData: Partial<Order>): Promise<Order> {
    return this.ordersService.createOrder(orderData);
  }

  @Get(':userId')
  async getOrders(@Param('userId') userId: string): Promise<Order[]> {
    return this.ordersService.getOrdersByUser(userId);
  }
}
