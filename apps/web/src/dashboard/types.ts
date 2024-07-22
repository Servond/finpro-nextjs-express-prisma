export interface Location {
    city_name: string;
}

export interface Category {
    name: string;
}

export interface Event {
    event_id: number;
    event_name: string;
    event_description: string;
    start_date: string;
    end_date: string;
    location: Location;
    categories: { category: Category }[];
    total_seats: number;
    available_seats: number;
    organizer_id: number;
    original_price: number;
}