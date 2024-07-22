export interface IUser {
  user_id?: number;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  own_referral_code?: string | null;
  point_balance: number;
  role_id: number;
  created_at?: Date;
  updated_at?: Date;
  referral_code?: string;  // Make referral_code optional
}
