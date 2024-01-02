import { IsEnum, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { PetsGender, StatusPet } from "src/utils/enums";


export class PetsDto {
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @IsOptional()
    description: string;

    @IsNotEmpty()
    @IsEnum(PetsGender)
    gender: string;

    @IsNotEmpty()
    size: string;

    @IsNotEmpty()
    color: string;

}

export class UpdatePetsDto {
    @IsOptional()
    name: string;

    @IsOptional()
    description: string;

    @IsOptional()
    @IsEnum(PetsGender)
    gender: string;

    @IsOptional()
    size: string;

    @IsOptional()
    color: string;

    @IsOptional()
    img: string;

    @IsOptional()
    @IsEnum(StatusPet)
    status: string;

    
}