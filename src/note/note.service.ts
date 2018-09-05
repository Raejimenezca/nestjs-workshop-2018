import { Injectable, Controller, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from 'shared/base.service';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './models/note.model';
import { ModelType } from 'typegoose';
import { MapperService } from 'shared/mapper/mapper.service';
import { NoteParams } from './models/view-models/note-param.model';
import { identity } from 'rxjs';

@Injectable()
export class NoteService extends BaseService<Note> {
    constructor(@InjectModel(Note.modelName) private readonly _noteModel: ModelType<Note>, private readonly _mapperService: MapperService,) {
        super();
        this._model = _noteModel;
        this._mapper = _mapperService.mapper;
    }

    async createNote(params: NoteParams): Promise<Note> {
        const {content, level, text, createdDate, updatedDate} = params;
        
        const newNote = new this._model();

        newNote.content = content;
        newNote.text = text;
        newNote.createdDate = createdDate;
        newNote.updatedDate = updatedDate;

        if(level) {
            newNote.level = level;
        }

        try {
            const result = await this.create(newNote);
            return result.toJSON() as Note;
        }catch(e){
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
