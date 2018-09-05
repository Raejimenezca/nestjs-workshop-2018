import { BaseModel, schemaOptions } from "shared/base.model";
import { prop, ModelType } from "typegoose";
import { ApiModelProperty } from "@nestjs/swagger";

export class Note extends BaseModel<Note> {
    @prop({default: false})
    isCompleted: boolean;
    @prop({required: [true, 'Text is required'] })
    text: string;
    @prop({ default: Date.now() })
    createdDate: Date;
    @prop({ default: Date.now() })
    updatedDate: Date;

    static get model(): ModelType<Note>{
        return new Note().getModelForClass(Note, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    } 
}