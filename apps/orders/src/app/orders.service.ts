import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';
import { OrdersRepository } from './orders.repository';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private readonly ordersRepository: OrdersRepository) {}
  
  async getOrders(): Promise<Order[]> {
    return this.ordersRepository.find({});
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    this.ordersRepository.create(createOrderDto);
  }
}
