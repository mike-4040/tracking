import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { snakeCase } from 'snake-case';

import { objectToCamelCase } from '../db/utils';
import { PG_CONNECTION } from '../constants';
import type { UserDB } from './types';
import { VALID_USER_PROPS_FOR_UPDATE } from './constants';

@Injectable()
export class UsersService {
  constructor(@Inject(PG_CONNECTION) private readonly pgConnection: Pool) {}

  async findUserByEmail(email: string): Promise<UserDB | undefined> {
    const query = `
      SELECT *
      FROM public.users
      WHERE email = $1 `;
    const params = [email];

    const { rows: users } = await this.pgConnection.query(query, params);

    const [user] = users;

    if (!user) {
      return undefined;
    }

    return objectToCamelCase<UserDB>(user);
  }

  async createUser(
    user: Omit<UserDB, 'userId' | 'orgId' | 'createdAt'>,
  ): Promise<number> {
    const { email, password, salt } = user;

    const query = `
      INSERT INTO public.users
        (email, password, salt, created_at)
      VALUES
        ($1, $2, $3, $4)
      RETURNING user_id `;
    const params = [email, password, salt, Date.now()];

    const { rows: users } = await this.pgConnection.query(query, params);

    const [newUser] = users;

    return newUser.user_id;
  }

  async updateUser(userId: number, user: Partial<UserDB>): Promise<boolean> {
    const props = Object.keys(user);
    if (
      props.some((prop) => !VALID_USER_PROPS_FOR_UPDATE.includes(prop as any))
    ) {
      throw new Error('Invalid props for update');
    }

    const params: any[] = [];
    const colVal = props
      .map(
        (prop) =>
          `${snakeCase(prop)} = $${params.push(user[prop as keyof UserDB])}`,
      )
      .join(', ');

    const query = `
      UPDATE public.users
      SET ${colVal}
      WHERE
        user_id = $${params.push(userId)} `;

    await this.pgConnection.query(query, params);

    return true;
  }

  async findUserById(userId: number): Promise<UserDB | undefined> {
    const query = `
      SELECT *
      FROM public.users
      WHERE user_id = $1 `;
    const params = [userId];

    const { rows: users } = await this.pgConnection.query(query, params);

    const [user] = users;

    if (!user) {
      return undefined;
    }

    return objectToCamelCase<UserDB>(user);
  }
  /**
   * @returns undefined if user not found, invalidatedAt, ms if user is invalidated or 0 if user is valid
   */
  async findUserInvalidatedAtId(userId: number): Promise<number | undefined> {
    const query = `
      SELECT invalidated_at
      FROM public.users
      WHERE user_id = $1 `;
    const params = [userId];

    const { rows: users } = await this.pgConnection.query(query, params);

    const [user] = users;

    if (!user) {
      return undefined;
    }

    return Number(user.invalidated_at || 0);
  }
}
