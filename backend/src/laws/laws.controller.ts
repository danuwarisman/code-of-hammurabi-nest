import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { LawsService } from './laws.service.js';
import { CreateLawDto } from './dto/create-law.dto.js';
import { UpdateLawDto } from './dto/update-law.dto.js';

@Controller('laws')
export class LawsController {
  constructor(private readonly lawsService: LawsService) {}

  @Post()
  create(@Body() createLawDto: CreateLawDto) {
    return this.lawsService.create(createLawDto);
  }

  @Get()
  findAll() {
    return this.lawsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lawsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLawDto: UpdateLawDto,
  ) {
    return this.lawsService.update(id, updateLawDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lawsService.remove(id);
  }
}
