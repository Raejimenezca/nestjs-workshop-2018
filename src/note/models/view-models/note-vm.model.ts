import { BaseModelVm } from "shared/base.model";
import { ApiModelProperty } from "@nestjs/swagger";
import { EnumToArray } from "shared/utilities/enum-to-array";
import { NoteLevel } from "../note-level.enum";

export class NoteVm extends BaseModelVm {
    @ApiModelProperty() content: string;
    @ApiModelProperty({enum: EnumToArray(NoteLevel) }) level: NoteLevel;
    @ApiModelProperty() isCompleted: boolean;
    @ApiModelProperty() text: string;
    @ApiModelProperty() createdDate: Date;
    @ApiModelProperty() updatedDate: Date;
}