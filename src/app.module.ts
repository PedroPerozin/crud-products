import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig, validate } from './config';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    load: [typeOrmConfig],
    validate
  }),
  TypeOrmModule.forRoot(typeOrmConfig()),
  RolesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
