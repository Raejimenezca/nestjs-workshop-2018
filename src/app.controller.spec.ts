import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('root', () => {
    it("should return { message: I'm ok }", () => {
      const appController = app.get<AppController>(AppController);
      let msg: any;
      msg =  { message: "I'm ok" };
      expect(appController.root()).toEqual(msg);
    });
  });
});
