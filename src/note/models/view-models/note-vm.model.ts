import { BaseModelVm } from "shared/base.model";
import { ApiModelProperty } from "@nestjs/swagger";

export class NoteVm extends BaseModelVm {

    @ApiModelProperty() isCompleted: boolean;
    @ApiModelProperty() text: string;
    @ApiModelProperty({type: String, format: 'date-time'}) createdDate: Date;
    @ApiModelProperty({type: String, format: 'date-time'}) updatedDate: Date;
}