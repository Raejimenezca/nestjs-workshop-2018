import { ApiModelProperty } from "@nestjs/swagger";

export class LoginVm {
    @ApiModelProperty()
    username: string;
    password: string;
}