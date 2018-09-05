import { ApiModelProperty} from "@nestjs/swagger";


export class UsersParams {
    @ApiModelProperty() username: string;
    @ApiModelProperty() name: string;
    @ApiModelProperty() notes: string;
}