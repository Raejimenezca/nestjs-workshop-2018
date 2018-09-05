import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note } from './models/note.model';

@Module({
  imports: [MongooseModule.forFeature([{name: Note.modelName, schema: Note.model.schema}])], 
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
