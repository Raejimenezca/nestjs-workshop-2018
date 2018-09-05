import { NoteLevel } from "../note-level.enum";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";
import { EnumToArray } from "shared/utilities/enum-to-array";

export class NoteParams {
    @ApiModelProperty() content: string;
    @ApiModelPropertyOptional({enum: EnumToArray(NoteLevel), example: NoteLevel.Normal}) level?: NoteLevel;
    @ApiModelProperty() text: string;
    @ApiModelProperty() createdDate: Date;
    @ApiModelProperty() updatedDate: Date;
}