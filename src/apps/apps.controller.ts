import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateAppDto } from './dto/update-app.dto';
import { UserDecor } from '../users/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Post()
  async create(
    @UserDecor('orgId') orgId: number,
    @Body() createAppDto: CreateAppDto,
  ) {
    if (!orgId) {
      throw new ForbiddenException('User does not belong to an Organization');
    }

    const { name } = createAppDto;

    const existingApps = await this.appsService.findByName(orgId, name);

    if (existingApps?.length) {
      throw new BadRequestException(`Application '${name}' already exists`);
    }

    return this.appsService.create(orgId, createAppDto);
  }

  @Get()
  findAll() {
    throw new NotImplementedException();
  }

  @Get('own')
  findAllOwn(@UserDecor('orgId') orgId: number) {
    if (!orgId) {
      return [];
    }

    return this.appsService.findAllByOrgId(orgId);
  }

  @Get(':id')
  async findOne(
    @UserDecor('orgId') orgId: number,
    @Param('id', ParseIntPipe) appId: number,
  ) {
    if (!orgId) {
      throw new ForbiddenException('User does not belong to an Organization');
    }

    const app = await this.appsService.findOne(orgId, appId);

    if (!app) {
      throw new NotFoundException('Application not found');
    }

    return app;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppDto: UpdateAppDto) {
    throw new NotImplementedException();
    return this.appsService.update(+id, updateAppDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new NotImplementedException();
    return this.appsService.remove(+id);
  }
}
