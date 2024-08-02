export interface IEvent {
  id: number;
  name: string;
  imagePath: string;
  eventTitle: string;
  date: string;
  location: string;
  price: number | null | undefined;
  organizerName: string;
  category?: { name: string } | undefined;
  description: string;
}

export interface IEventCardProps {
  event: {
    id: number;
    imagePath: string;
    eventTitle: string;
    date: string;
    location: string;
    price: number | null | undefined;
    organizerName: string;
    category?: { name: string };
  };
}

export interface IPromotion {
  type: 'discount';
  code: string;
  amount: number;
  maxUses: number;
  startDate?: Date;
  endDate?: Date;
  description?: string;
}

export interface ITicket {
  type: string;
  price: string;
}

export interface IReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
}

export interface IReviewsProps {
  eventId: number;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  maxPages: number;
  onPageChange: (page: number) => void;
}

export interface IModalProps {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

export interface IEventFormData {
  organizerName: string;
  eventTitle: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  venueName: string;
  price: string;
  capacity: string;
  categoryId: string;
  tickets: ITicket[];
  imageFile: File | null;
  isFree: boolean;
  promotions: IPromotion[];
}
