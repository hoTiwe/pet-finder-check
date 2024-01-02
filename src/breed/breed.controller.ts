import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { BreedsService } from "./breed.service";
import { BreedDto } from "./breed.dto";

@Controller('breeds')
export class BreedsController {
    constructor(
        private readonly breedsService: BreedsService,
    ) {}

    @Post('/create')
    @HttpCode(HttpStatus.OK)
    async createSpecie(
        @Body() createBreedsDto: BreedDto ,
    ){
        return await this.breedsService.addBreed(createBreedsDto);
    }
}
