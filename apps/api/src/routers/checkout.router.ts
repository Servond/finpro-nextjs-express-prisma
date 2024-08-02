import { Router } from 'express';
import { CheckoutController } from '@/controllers/checkout.controller';
import { Routes } from '@/interfaces/router';

export class CheckoutRoutes implements Routes {
  public path = '/checkout';
  public router = Router();
  private checkoutController: CheckoutController;

  constructor() {
    this.checkoutController = new CheckoutController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(this.path, this.checkoutController.createCheckout);
  }
}

export default CheckoutRoutes;
