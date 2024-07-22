export interface IEvent {
  organizer_id: number;
  event_name: string;
  event_description: string;
  original_price: number;
  start_date: Date;
  end_date: Date;
  location_id: number;
  total_seats: number;
}

export interface IEventCategory {
  category_id: number;
}


