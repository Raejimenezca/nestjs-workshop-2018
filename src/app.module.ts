import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ConfigurationService } from 'shared/configuration/configuration.service';
import { Configuration } from './shared/configuration/configuration.enum';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [SharedModule, MongooseModule.forRoot(ConfigurationService.connectionString), UserModule, TodoModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {

  static host: string;
  static port: number | string;
  static isDev: boolean;

  constructor(private readonly _ConfigurationService: ConfigurationService){
    AppModule.port = AppModule.normalizePort(_ConfigurationService.get(Configuration.PORT));
    AppModule.host = _ConfigurationService.get(Configuration.HOST);
    AppModule.isDev = _ConfigurationService.isDevelopmnet;
  }

  private static normalizePort(param: number | string): number | string {
    const portNumber: number = typeof param === 'string' ? parseInt(param, 10): param;
    if(isNaN(portNumber)) return param;
    else if(portNumber >= 0) return portNumber;
  }
}
