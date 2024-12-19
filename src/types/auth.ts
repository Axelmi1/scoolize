export type UserRole = 'student' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
