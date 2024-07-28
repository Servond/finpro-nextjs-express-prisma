export interface FormValues {
  username: string;
  comment: string;
  rating: string;
}

export interface FormProps {
  initialUsername?: string;
  initialComment?: string;
  initialRating?: string;
}
