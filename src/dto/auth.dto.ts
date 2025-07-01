import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ description: 'User fullName', required: true, type: String })
    fullName: string;

    @ApiProperty({ description: 'User email address', required: true, type: String })
    email: string;

    @ApiProperty({ description: 'User password', required: true, type: String })
    password: string;
}

export class LoginUserDto {
    @ApiProperty({ description: 'User email address', required: true, type: String })
    email: string;

    @ApiProperty({ description: 'User password', required: true, type: String })
    password: string;
}