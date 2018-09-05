import { BaseModelVm } from "shared/base.model";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";


export class UsersVm extends BaseModelVm {
    @ApiModelProperty() username: string;
    @ApiModelProperty() name: string;
    @ApiModelProperty() notes: string;
    @ApiModelProperty() isCompleted: boolean;
}