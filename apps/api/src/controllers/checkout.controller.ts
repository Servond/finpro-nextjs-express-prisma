import { Request, Response, NextFunction } from 'express';
import { CheckoutActions } from '@/actions/checkout.actions';

export class CheckoutController {
  private checkoutActions: CheckoutActions;

  constructor() {
    this.checkoutActions = new CheckoutActions();
  }

  public createCheckout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { eventId, tickets } = req.body;
      const createdOrders = await this.checkoutActions.createCheckoutAction(eventId, tickets);

      res.status(201).json(createdOrders);
    } catch (error: any) {
      console.error('Error during checkout:', error);
      res.status(500).json({ message: 'Failed to proceed to checkout', error: error.message });
    }
  }
}
