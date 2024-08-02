import { Router } from 'express';
import { EventsController } from '@/controllers/events.controller';
import upload from '@/middlewares/upload';
import { Routes } from '@/interfaces/router';

export class EventsRouter implements Routes {
  public path = '/events';
  public router = Router();
  private eventsController: EventsController;

  constructor() {
    this.eventsController = new EventsController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}/`, this.eventsController.getEventsController);
    this.router.get(
      `${this.path}/:id`,
      this.eventsController.getEventByIdController,
    );
    this.router.post(
      `${this.path}/`,
      upload.single('image'),
      this.eventsController.createEventController,
    );
    this.router.get(
      `${this.path}/search`,
      this.eventsController.searchEventsController,
    );
    this.router.get(
      '/categories',
      this.eventsController.getCategoriesController,
    );
    this.router.get(
      `${this.path}/:id/promotions`,
      this.eventsController.getPromotionsByEventIdController,
    );
    this.router.get(
      `${this.path}/:id/reviews`,
      this.eventsController.getReviewsController,
    );
    this.router.post(
      `${this.path}/:id/createreviews`,
      this.eventsController.createReviewController,
    );
    this.router.put(
      `${this.path}/:id`,
      this.eventsController.updateEventController,
    );
  }
}

export default EventsRouter;
