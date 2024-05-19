import { constants } from 'http2';
import { Body, Controller, HttpCode, Inject, Param, Put } from '@nestjs/common';
import { CustomerId } from '../../../domain/customerId';
import { AddCartItemUseCase } from '../../../useCase/addCartItemUseCase';
import { PutRequestBody } from './putRequest';
import type { PutResponse } from './putResponse';

@Controller()
export class CartController {
  constructor(
    @Inject(AddCartItemUseCase.token)
    private readonly addCartItem: AddCartItemUseCase,
  ) {}

  @Put('carts/:customerId')
  @HttpCode(constants.HTTP_STATUS_CREATED)
  async put(
    @Param('customerId') customerId: CustomerId,
    @Body() { productId, quantity }: PutRequestBody,
  ): Promise<PutResponse> {
    const { cart } = await this.addCartItem.run({
      customerId,
      productId,
      quantity,
    });
    const item = cart.items.find((i) => i.productId === productId);
    return item!;
  }
}
