export type User = {
  user_id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role_name: string;
  referral_code: string;
};

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
