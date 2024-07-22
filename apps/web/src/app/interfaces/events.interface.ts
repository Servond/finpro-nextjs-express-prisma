export interface IEvent {
    organizerId: number;
    eventName: string;
    eventDescription: string;
    startDate: Date | null;
    endDate: Date | null;
    ticketType: string;
    originalPrice: number;
    location: number;
    category: number;
    totalSeats: number;
}