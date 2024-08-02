import { Request, Response, NextFunction } from 'express';
import { EventActions } from '../actions/events.actions';
import { HttpException } from '@/exceptions/http.exception';

export class EventsController {
  private eventActions = new EventActions();

  public getEventsController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const events = await this.eventActions.getEventsAction();
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  };

  public getEventByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const event = await this.eventActions.getEventByIdAction(
        parseInt(req.params.id, 10),
      );
      if (!event) {
        throw new HttpException(404, 'Event not found');
      }
      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  };

  public searchEventsController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { search, location } = req.query as {
        search: string;
        location: string;
      };
      const events = await this.eventActions.searchEventsAction(
        search,
        location,
      );
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  };

  public createEventController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
      const eventData = { ...req.body, imagePath };
      const newEvent = await this.eventActions.createEventAction(eventData);
      res.status(200).json(newEvent);
    } catch (error) {
      next(new HttpException(500, 'Failed to create event'));
    }
  };

  public getCategoriesController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const categories = await this.eventActions.getCategoriesAction();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  };

  public getPromotionsByEventIdController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const promotions = await this.eventActions.getPromotionsByEventIdAction(
        parseInt(req.params.id, 10),
      );
      res.status(200).json(promotions);
    } catch (error) {
      next(error);
    }
  };

  public getReviewsController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const reviews = await this.eventActions.getReviewsAction(
        parseInt(req.params.id, 10),
      );
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  };

  public createReviewController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const reviewData = {
        eventId: parseInt(req.params.id, 10),
        ...req.body,
      };
      const newReview = await this.eventActions.createReviewAction(reviewData);
      res.status(201).json(newReview);
    } catch (error) {
      next(error);
    }
  };

  public updateEventController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const eventId = parseInt(req.params.id, 10);
      const eventData = req.body;

      const updatedEvent = await this.eventActions.updateEventAction(
        eventId,
        eventData,
      );

      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update event' });
    }
  };

  public deleteEventController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.eventActions.deleteEventAction(parseInt(req.params.id, 10));
      res.status(204).send();
    } catch (error) {
      next(new HttpException(500, 'Failed to delete event'));
    }
  };
}
