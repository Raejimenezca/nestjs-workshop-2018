import { Injectable, Controller, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from '../shared/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './models/users.model';
import { ModelType } from 'typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { UsersParams } from './models/view-models/users-param.model';


@Injectable()
export class UsersService extends BaseService<Users> {
    constructor(@InjectModel(Users.modelName) private readonly _usersModel: ModelType<Users>, private readonly _mapperService: MapperService,) {
        super();
        this._model = _usersModel;
        this._mapper = _mapperService.mapper;
    }

    async createUser(params: UsersParams): Promise<Users> {
        const {username, name, notes} = params;
        
        
        const newUser = new this._model();

        newUser.username = username;
        newUser.name = name;       
        newUser.notes = notes;

        try {
            const result = await this.create(newUser);
            return result.toJSON() as Users;
        }catch(e){
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
