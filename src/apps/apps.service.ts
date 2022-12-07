import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import type { AppBase } from './types';
import { CreateAppDto } from './dto/create-app.dto';
import { objectToCamelCase } from '../db/utils';
import { PG_CONNECTION } from '../constants';
import { UpdateAppDto } from './dto/update-app.dto';

@Injectable()
export class AppsService {
  constructor(@Inject(PG_CONNECTION) private readonly pgConnection: Pool) {}
  async create(orgId: number, createAppDto: CreateAppDto) {
    const { name } = createAppDto;

    const query = `
      INSERT INTO public.apps (org_id, name)
      VALUES ($1, $2)
      RETURNING app_id `;
    const params = [orgId, name];

    const { rows: apps } = await this.pgConnection.query(query, params);

    const [app] = apps;

    return objectToCamelCase<Pick<AppBase, 'appId'>>(app);
  }

  async findAllByOrgId(orgId: number) {
    const query = `
      SELECT *
      FROM public.apps
      WHERE org_id = $1 `;
    const params = [orgId];

    const { rows: apps } = await this.pgConnection.query(query, params);

    return apps.map((app) => objectToCamelCase<AppBase>(app));
  }

  async findOne(orgId: number, appId: number) {
    const query = `
      SELECT *
      FROM public.apps
      WHERE
        org_id = $1
        AND app_id = $2 `;
    const params = [orgId, appId];

    const { rows: apps } = await this.pgConnection.query(query, params);

    const [app] = apps;

    return app ? objectToCamelCase<AppBase>(app) : null;
  }

  async findByName(orgId: number, name: string) {
    const query = `
      SELECT *
      FROM public.apps
      WHERE
        org_id = $1
        and name = $2 `;
    const params = [orgId, name];

    const { rows: apps } = await this.pgConnection.query(query, params);

    if (!apps.length) {
      return undefined;
    }

    return apps.map((app) => objectToCamelCase<AppBase>(app));
  }

  update(id: number, updateAppDto: UpdateAppDto) {
    return `This action updates a #${id} app with ${JSON.stringify(
      updateAppDto,
    )}`;
  }

  remove(id: number) {
    return `This action removes a #${id} app`;
  }
}
