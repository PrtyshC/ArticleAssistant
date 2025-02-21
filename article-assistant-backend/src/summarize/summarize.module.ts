import { Module } from '@nestjs/common';
import { SummarizeController } from './summarize.controller';

@Module({
  controllers: [SummarizeController]
})
export class SummarizeModule {}
