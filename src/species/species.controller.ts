import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { SpeciesService } from "./species.service";
import { SpeciesDto } from "./species.dto";


@Controller('species')
export class SpeciesController {
    constructor(
        private readonly speciesService: SpeciesService,
    ) {}

    @Post('/create')
    @HttpCode(HttpStatus.OK)
    async createSpecie(
        @Body() createSpecieDto: SpeciesDto,
    ){
        return await this.speciesService.createSpecie(createSpecieDto);
    }
}
