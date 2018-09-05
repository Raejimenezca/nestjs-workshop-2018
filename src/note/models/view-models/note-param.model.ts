import { ApiModelProperty } from "@nestjs/swagger";

export class NoteParams {
    
    @ApiModelProperty() text: string;
    @ApiModelProperty({type: String, format: 'date-time'}) createdDate: Date;
    @ApiModelProperty({type: String, format: 'date-time'}) updatedDate: Date;
}