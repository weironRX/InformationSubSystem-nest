import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ServiceService } from './service/service.service';
import { ChangeService } from './change/change.service';
import { ChangeModule } from './change/change.module';
import { ServiceModule } from './service/service.module';
import { SessionModule } from './session/session.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, ChangeModule, ServiceModule, SessionModule, ClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
