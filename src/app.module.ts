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
import { PaymentModule } from './Payment/Payment.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    SequelizeModule.forRoot(CONFIG_DB as SequelizeOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './src/.env'
    }),
    UserModule,
    AuthModule,
    OrderModule,
    PaymentModule,
    JwtSharedModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
