import { User } from "./user.model";

export interface UserState {
  users: User[];
  error: string | null;
  user: User | null;
  total_pages: number;
  totalUsers: number;
  status: 'loading' | 'idle' | 'succeeded' | 'failed';
}
