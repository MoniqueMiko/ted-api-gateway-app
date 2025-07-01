import { ApiProperty } from "@nestjs/swagger";

export class UrlDto {
    @ApiProperty({   description: 'Original URL to be shortened', required: true, type: String })
    url: string;
}