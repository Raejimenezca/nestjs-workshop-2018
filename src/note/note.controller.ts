import { Controller, Post, HttpService, HttpStatus, Get, Put, Delete, Param, Body, HttpException } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Note } from './models/note.model';
import { NoteService } from './note.service';
import { map, isArray } from 'lodash';
import { NoteParams } from './models/view-models/note-param.model';
import { NoteVm } from './models/view-models/note-vm.model';
import { ApiException } from 'shared/api-exception.model';
import { GetOperationId } from 'shared/utilities/get-operation-id';

@Controller('notes')
@ApiUseTags(Note.modelName)
export class NoteController {
    constructor(private readonly _noteService: NoteService){}

    @Post()
    @ApiResponse({status: HttpStatus.CREATED, type: NoteVm})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, type: ApiException})
    @ApiOperation(GetOperationId(Note.modelName, 'Create'))
    async create(@Body() params: NoteParams): Promise<NoteVm> {
        const { text } = params;

        if (!text){
            throw new HttpException('Text is required', HttpStatus.BAD_REQUEST);
        }

        try {
            const newNote = await this._noteService.createNote(params);
            return this._noteService.map<NoteVm>(newNote);
        } catch(e) {

        }
    }

    @Get()
    @ApiResponse({status: HttpStatus.OK, type: NoteVm, isArray: true})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, type: ApiException})
    @ApiOperation(GetOperationId(Note.modelName, 'GetAll'))
    async get(): Promise<NoteVm[]>{
        try{
            const notes = await this._noteService.findAll();
            return this._noteService.map<NoteVm[]>(map(notes, note => note.toJSON()), true);
        }catch(e){
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put()
    @ApiResponse({status: HttpStatus.CREATED, type: NoteVm})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, type: ApiException})
    @ApiOperation(GetOperationId(Note.modelName, 'Update'))
    async update(@Body() vm: NoteVm): Promise<NoteVm> {
        const { id, isCompleted, text, createdDate, updatedDate } = vm;

        if(!vm || !id) {
            throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
        }

        const exist = await this._noteService.findById(id);

        if(!exist) {
            throw new HttpException(`${id} Not found`, HttpStatus.NOT_FOUND);
        }

        if(exist.isCompleted) {
            throw new HttpException('Already Completed', HttpStatus.BAD_REQUEST);
        }

        exist.isCompleted = isCompleted;
        exist.text = text;
        exist.createdDate = createdDate;
        exist.updatedDate = updatedDate;

        try{
            const updated = await this._noteService.update(id, exist);
            return this._noteService.map<NoteVm>(updated.toJSON());
        }catch(e){
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id') 
    @ApiResponse({status: HttpStatus.OK, type: NoteVm})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, type: ApiException})
    @ApiOperation(GetOperationId(Note.modelName, 'Delete'))
    async delete(@Param('id') id: string): Promise<NoteVm> {
        try{
            const deleted = await this._noteService.delete(id);
            return this._noteService.map<NoteVm>(deleted.toJSON());
        }catch(e){
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
