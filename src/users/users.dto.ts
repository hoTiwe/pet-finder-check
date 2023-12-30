import { IsEmpty, IsNotEmpty, IsOptional, MinLength } from "class-validator";


export class UsersDto {


    @IsNotEmpty()
    @MinLength(3)
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    fullname: string;

    @IsOptional()
    admin: boolean;

    @IsNotEmpty()
    numberPhone: string;

}
