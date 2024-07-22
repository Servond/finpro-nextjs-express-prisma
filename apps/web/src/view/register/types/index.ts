export interface FormValues {
  username: string;
  email: string;
  password: string;
  referralId: string;
}

export interface FormProps {
  initialUsername?: string;
  initialEmail?: string;
  initialPassword?: string;
  initialReferralId?: string;
}
