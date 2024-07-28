export interface FormValues {
  eventname: string;
  price: string;
  date: string;
  time: string;
  location: string;
  description: string;
  seat: string;
  type: string;
}

export interface FormProps {
  initialEventname?: string;
  initialPrice?: string;
  initialDate?: string;
  initialTime?: string;
  initialLocation?: string;
  initialDescription?: string;
  initialSeat?: string;
  initialType?: string;
}
