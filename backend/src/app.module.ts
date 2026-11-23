import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LawsModule } from './laws/laws.module.js';

@Module({
  imports: [LawsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
