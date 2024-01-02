import { IsNotEmpty, IsOptional } from "class-validator";

export class BreedDto{
    @IsNotEmpty()
    public name: string;

    @IsOptional()
    public specie: string;
}