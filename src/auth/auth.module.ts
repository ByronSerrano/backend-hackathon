import { Module } from '@nestjs/common';
import { AuthService } from '@/src/auth/auth.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<JwtModuleOptions> => ({
        secret: configService.get<string>('SECRET_KEY_JWT'),
        // Expiration time for the JWT
        // signOptions: { expiresIn: configService.get<string>('EXPIRES_IN_JWT') },
      }),
    }),
  ],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
