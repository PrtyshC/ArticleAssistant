import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SummarizeController } from './summarize/summarize.controller';
import { ChatbotModule } from './chatbot/chatbot.module';
import * as cors from 'cors';
import { ChatbotController } from './chatbot/chatbot.controller';

@Module({
  controllers: [SummarizeController, ChatbotController],
  imports: [ChatbotModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
