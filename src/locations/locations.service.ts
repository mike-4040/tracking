import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import { CreateLocationDto } from './dto/create-location.dto';
import type { LocationBase } from './types';
import { objectToCamelCase } from '../db/utils';
import { PG_CONNECTION } from '../constants';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(@Inject(PG_CONNECTION) private readonly pgConnection: Pool) {}

  async create(
    orgId: number,
    appId: number,
    createLocationDto: CreateLocationDto,
  ) {
    const query = `
      INSERT INTO public.locations
        ( org_id, app_id, name )
      VALUES ($1, $2, $3)
      RETURNING location_id `;
    const params = [orgId, appId, createLocationDto.name];

    const { rows: newLocations } = await this.pgConnection.query(query, params);

    const [newLocation] = newLocations;

    return objectToCamelCase<Pick<LocationBase, 'locationId'>>(newLocation);
  }

  async findAllByOrgId(orgId: number) {
    const query = `
      SELECT *
      FROM public.locations
      WHERE org_id = $1 `;
    const params = [orgId];

    const { rows: locations } = await this.pgConnection.query(query, params);

    return locations.map((row) => objectToCamelCase(row));
  }

  async findAllByAppId(orgId: number, appId: number) {
    const query = `
      SELECT *
      FROM public.locations
      WHERE
        org_id = $1
        AND app_id = $2 `;
    const params = [orgId, appId];

    const { rows: locations } = await this.pgConnection.query(query, params);

    return locations.map((row) => objectToCamelCase(row));
  }

  async findOne(orgId: number, locationId: number) {
    const query = `
      SELECT *
      FROM public.locations
      WHERE
        org_id = $1
        AND location_id = $2 `;
    const params = [orgId, locationId];

    const { rows: locations } = await this.pgConnection.query(query, params);

    const [location] = locations;

    return location ? objectToCamelCase(location) : null;
  }

  async findByName(orgId: number, appId: number, name: string) {
    const query = `
      SELECT *
      FROM public.locations
      WHERE
        org_id = $1
        AND app_id = $2
        AND name = $3`;
    const params = [orgId, appId, name];

    const { rows: locations } = await this.pgConnection.query(query, params);

    return locations.map((row) => objectToCamelCase(row));
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location with ${updateLocationDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
