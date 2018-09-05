import { Controller, Post, HttpStatus, Get, Put, Delete, Param, Body, HttpException } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Users } from './models/users.model';
import { UsersService } from './users.service';
import { map, isArray } from 'lodash';
import { UsersParams } from './models/view-models/users-param.model';
import { UsersVm } from './models/view-models/users-vm.model';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';

@Controller('users')
@ApiUseTags(Users.modelName)
export class UsersController {
    constructor(private readonly _usersService: UsersService){}

    @Post()
    @ApiResponse({status: HttpStatus.CREATED, type: UsersVm})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, type: ApiException})
    @ApiOperation(GetOperationId(Users.modelName, 'Create'))
    async create(@Body() params: UsersParams): Promise<UsersVm> {
        const { username } = params;

        if (!username){
            throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
        }

        try {
            const newUser = await this._usersService.createUser(params);
            return this._usersService.map<UsersVm>(newUser);
        } catch(e) {

        }
    }

    @Get()
    @ApiResponse({status: HttpStatus.OK, type: UsersVm, isArray: true})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, type: ApiException})
    @ApiOperation(GetOperationId(Users.modelName, 'GetAll'))
    async get(): Promise<UsersVm[]>{
        try{
            const users = await this._usersService.findAll();
            return this._usersService.map<UsersVm[]>(map(users, user => user.toJSON()), true);
        }catch(e){
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put()
    @ApiResponse({status: HttpStatus.CREATED, type: UsersVm})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, type: ApiException})
    @ApiOperation(GetOperationId(Users.modelName, 'Update'))
    async update(@Body() vm: UsersVm): Promise<UsersVm> {
        const { id, username, name, notes, isCompleted} = vm;

        if(!vm || !id) {
            throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
        }

        const exist = await this._usersService.findById(id);

        if(!exist) {
            throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
        }

        if(exist.isCompleted){
            throw new HttpException('Already completed', HttpStatus.BAD_REQUEST);
        }

        exist.username = username;
        exist.isCompleted = isCompleted;
        exist.name = name;
        exist.notes = notes;

        try{
            const updated = await this._usersService.update(id, exist);
            return this._usersService.map<UsersVm>(updated.toJSON());
        }catch(e){
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id') 
    @ApiResponse({status: HttpStatus.OK, type: UsersVm})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, type: ApiException})
    @ApiOperation(GetOperationId(Users.modelName, 'Delete'))
    async delete(@Param('id') id: string): Promise<UsersVm> {
        try{
            const deleted = await this._usersService.delete(id);
            return this._usersService.map<UsersVm>(deleted.toJSON());
        }catch(e){
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
