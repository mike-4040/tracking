import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import { CreateOrgDto } from './dto/create-org.dto';
import { objectToCamelCase } from '../db/utils';
import type { OrgBase } from './types';
import { PG_CONNECTION } from '../constants';
import { UpdateOrgDto } from './dto/update-org.dto';

@Injectable()
export class OrgsService {
  constructor(@Inject(PG_CONNECTION) private readonly pgConnection: Pool) {}

  async create(createOrgDto: CreateOrgDto): Promise<number> {
    const { name } = createOrgDto;
    const query = `
      INSERT INTO public.orgs
        ( name)
      VALUES
        ( $1)
      RETURNING org_id `;
    const params = [name];

    const { rows: orgs } = await this.pgConnection.query(query, params);

    const [org] = orgs;

    return org.org_id;
  }

  findAll() {
    return `This action returns all orgs`;
  }

  async findOne(orgId: number) {
    const query = `
      SELECT *
      FROM public.orgs
      WHERE org_id = $1 `;
    const params = [orgId];

    const { rows: orgs } = await this.pgConnection.query(query, params);

    const [org] = orgs;

    if (!org) {
      return null;
    }

    return objectToCamelCase<OrgBase>(org);
  }

  update(id: number, updateOrgDto: UpdateOrgDto) {
    return `This action updates a #${id} org` + JSON.stringify(updateOrgDto);
  }

  remove(id: number) {
    return `This action removes a #${id} org`;
  }
}
