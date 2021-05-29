import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['env/default.env', `env/${process.env.NODE_ENV}.env`],
    }),
  ],
})
export class AppModule {}
