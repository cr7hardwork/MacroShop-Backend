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

@Module({
  imports: [
    SequelizeModule.forRoot(CONFIG_DB as SequelizeOptions),
    UserModule,
    AuthModule,
    OrderModule,
    JwtSharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
