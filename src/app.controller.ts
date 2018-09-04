import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // localhost:3000/root
export class AppController {
  constructor(private readonly appService: AppService) {}

  //_router.get('/hello');
  // localhost:3000/root/hello
  @Get()
  root(): any {
    return this.appService.root();
  }
}
