import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotImplementedException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AppsService } from '../apps/apps.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocationsService } from './locations.service';
import { UpdateLocationDto } from './dto/update-location.dto';
import { UserDecor } from '../users/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('locations')
export class LocationsController {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly appsService: AppsService,
  ) {}

  @Post()
  async create(
    @UserDecor('orgId') orgId: number,
    @Body() createLocationDto: CreateLocationDto,
  ) {
    if (!orgId) {
      throw new ForbiddenException('User does not belong to an Organization');
    }

    createLocationDto.orgId = orgId;

    const { appId, name } = createLocationDto;

    const app = await this.appsService.findOne(orgId, appId);

    if (!app) {
      throw new BadRequestException('App does not exist for this Organization');
    }

    const existingLocations = await this.locationsService.findByName(
      orgId,
      appId,
      name,
    );

    if (existingLocations.length) {
      throw new BadRequestException('Location already exists');
    }

    return this.locationsService.create(orgId, appId, createLocationDto);
  }

  @Get()
  findAllOrgLocations(@UserDecor('orgId') orgId: number) {
    if (!orgId) {
      throw new ForbiddenException('User does not belong to an Organization');
    }

    return this.locationsService.findAllByOrgId(orgId);
  }

  @Get('app/:id')
  async findAllAppLocations(
    @UserDecor('orgId') orgId: number,
    @Param('id') appId: number,
  ) {
    if (!orgId) {
      throw new ForbiddenException('User does not belong to an Organization');
    }

    if (!appId) {
      throw new BadRequestException('App ID is required');
    }

    const app = await this.appsService.findOne(orgId, appId);

    if (!app) {
      throw new BadRequestException('App does not exist for this Organization');
    }

    return this.locationsService.findAllByAppId(orgId, appId);
  }

  @Get(':id')
  async findOne(
    @UserDecor('orgId') orgId: number,
    @Param('id') locationId: number,
  ) {
    if (!orgId) {
      throw new ForbiddenException('User does not belong to an Organization');
    }

    if (!locationId) {
      throw new BadRequestException('Location ID is required');
    }

    const location = await this.locationsService.findOne(orgId, locationId);

    if (!location) {
      throw new BadRequestException('Location does not exist');
    }

    return location;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    throw new NotImplementedException();
    return this.locationsService.update(+id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new NotImplementedException();
    return this.locationsService.remove(+id);
  }
}
