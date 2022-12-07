import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateOrgDto } from './dto/create-org.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrgsService } from './orgs.service';
import { UpdateOrgDto } from './dto/update-org.dto';
import { UserAuth } from '../users/types';
import { UserDecor } from '../users/user.decorator';
import { UsersService } from '../users/users.service';

@UseGuards(JwtAuthGuard)
@Controller('orgs')
export class OrgsController {
  constructor(
    private readonly orgsService: OrgsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(
    @UserDecor() user: UserAuth,
    @Body() createOrgDto: CreateOrgDto,
  ) {
    if (user.orgId) {
      throw new BadRequestException('User already belongs to an org');
    }

    const orgId = await this.orgsService.create(createOrgDto);

    await this.usersService.updateUser(user.userId, {
      orgId,
      invalidatedAt: Date.now(),
    });

    return { success: true };
  }

  @Get('own')
  async findOwn(@UserDecor('orgId') orgId: number) {
    if (!orgId) {
      throw new BadRequestException('User does not belong to an org');
    }

    const org = await this.orgsService.findOne(orgId);

    return org || { success: false };
  }

  @Get()
  findAll() {
    throw new NotImplementedException();
    return this.orgsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    throw new NotImplementedException();
    return this.orgsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrgDto: UpdateOrgDto) {
    throw new NotImplementedException();
    return this.orgsService.update(+id, updateOrgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new NotImplementedException();
    return this.orgsService.remove(+id);
  }
}
