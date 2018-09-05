import { BaseModel, schemaOptions } from "shared/base.model";
import { NoteLevel } from "./note-level.enum";
import { prop, ModelType } from "typegoose";

export class Note extends BaseModel<Note> {
    @prop({required: [true, 'Content is required'] })
    content: string;
    @prop({enum: NoteLevel, default: NoteLevel.Normal })
    level: NoteLevel;
    @prop({default: false})
    isCompleted: boolean;

    static get model(): ModelType<Note>{
        return new Note().getModelForClass(Note, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    } 
}