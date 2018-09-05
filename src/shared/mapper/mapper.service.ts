import { Injectable } from '@nestjs/common';
import 'automapper-ts/dist/automapper';

@Injectable()
export class MapperService {

    mapper: AutoMapperJs.AutoMapper;

    constructor(){
        this.mapper = automapper;
        this.initializeMapper();
    }

    private initializeMapper(): void {
        this.mapper.initialize(MapperService.configure);
    }

    private static configure(Config: AutoMapperJs.IConfiguration): void {
        Config.createMap('User', 'UserVm')
        .forSourceMember('_id', opts => opts.ignore())
        .forSourceMember('password', opts => opts.ignore());

        Config.createMap('Users', 'UsersVm').forSourceMember('_id', opts => opts.ignore());
        Config.createMap('Users[]', 'UsersVm[]').forSourceMember('_id', opts => opts.ignore());
    } 
}
