export interface UserBase {
  userId: number;
  orgId?: number | null;
}

export interface UserDB extends UserBase {
  email: string;
  password: string;
  salt: string;
  createdAt: number;
  invalidatedAt?: number | null;
}

export type UserAuth = Pick<UserBase, 'userId' | 'orgId'>;
