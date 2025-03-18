import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtSharedModule } from './jwt/jwt.module';
import { CONFIG_DB } from './config/config.db';
import { SequelizeOptions } from 'sequelize-typescript';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './Email/Email.module';

@Module({
  imports: [
    SequelizeModule.forRoot(CONFIG_DB as SequelizeOptions),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    OrderModule,
    EmailModule,
    JwtSharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
