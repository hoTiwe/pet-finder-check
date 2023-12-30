import { IsNotEmpty, MinLength } from "class-validator";


export class SpeciesDto {
    @IsNotEmpty()
    @MinLength(2)
    public name: string;
}
