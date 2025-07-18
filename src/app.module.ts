import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataBaseConfig } from './config/database.config';
import { CameraModule } from './camera/camera.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        ...dataBaseConfig,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    CameraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'user', method: RequestMethod.POST },
        { path: 'user/:id', method: RequestMethod.GET },
        { path: 'chatbot/message', method: RequestMethod.POST },
        { path: 'chatbot/business-info', method: RequestMethod.GET },
        { path: 'chatbot/health', method: RequestMethod.GET },
        { path: 'camera/all-data', method: RequestMethod.GET },
        { path: 'camera/total-space', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
