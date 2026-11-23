import { Module } from '@nestjs/common';
import { LawsService } from './laws.service.js';
import { LawsController } from './laws.controller.js';

@Module({
  controllers: [LawsController],
  providers: [LawsService],
})
export class LawsModule {}
