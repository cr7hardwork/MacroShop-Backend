import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtSharedModule } from './jwt/jwt.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'macro-shop',
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    JwtSharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
