import { Module, Global } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { MapperService } from './mapper/mapper.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategyService } from './auth/strategies/jwt-strategy.service';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  providers: [ConfigurationService, MapperService, AuthService, JwtStrategyService],
  exports: [ConfigurationService, MapperService, AuthService], 
  imports: [UserModule],
})
export class SharedModule {}
