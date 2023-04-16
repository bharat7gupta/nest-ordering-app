import { Controller, Get } from '@nestjs/common';

import { BillingService } from './billing.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService
  ) {}

  @Get()
  getData() {
    return this.billingService.getData();
  }

  @EventPattern('ORDER_CREATED')
  handleOrderCreated(@Payload() data, @Ctx() context: RmqContext) {
    console.log('billing', data);
    this.billingService.bill(data);
    this.rmqService.ack(context);
  }
}
