import { EventController } from '@/controllers/event.controller';
import { Router } from 'express';

export class EventRouter {
  private router: Router = Router();
  private eventController = new EventController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/events', this.eventController.createEvent);
    this.router.get('/events', this.eventController.getEvents);
    this.router.get('/events/:event_id', this.eventController.getEvent);
  }

  getRouter(): Router {
    return this.router;
  }
}
