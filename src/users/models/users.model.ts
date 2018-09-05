import { BaseModel, schemaOptions } from "shared/base.model";
import { prop, ModelType } from "typegoose";

export class Users extends BaseModel<Users> {
    @prop({required: [true, 'Username is required']})
    username: string;
    @prop({required: [true, 'Name is required']})
    name: string;
    @prop({required: [true, 'Notes are required']})
    notes: string;
    @prop({default: false})
    isCompleted: boolean;   

    static get model(): ModelType<Users>{
        return new Users().getModelForClass(Users, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    } 
}