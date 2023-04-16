import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schema';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE } from './constants/service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy
  ) {}

  async getOrders(): Promise<Order[]> {
    return this.ordersRepository.find({});
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const session = await this.ordersRepository.startTransaction();

    try {
      const order = this.ordersRepository.create(createOrderDto, { session });

      await lastValueFrom(
        this.billingClient.emit('ORDER_CREATED', {
          order: createOrderDto
        })
      );

      await session.commitTransaction();

      return order;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }
}
