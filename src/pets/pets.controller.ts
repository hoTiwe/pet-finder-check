import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { PetsService } from "./pets.service";
import { PetsDto, UpdatePetsDto } from "./pets.dto";



@Controller('pets')
export class PetsController {
    constructor(
        private readonly petsService: PetsService,
    ) {}

    @Post('/create')
    @HttpCode(HttpStatus.OK)
    async createPet(
        @Query('userId') userId: number,
        @Query('breed') breed: number,
        @Body() createPetsDto: PetsDto,
        
    ){
        return await this.petsService.createSpecie(createPetsDto, userId, breed);
    }

    @Patch('/update/:petId')
    @HttpCode(HttpStatus.OK)
    async updatePet(
        @Param('petId', ParseIntPipe) petId: number,
        @Body() updatePetsDto: UpdatePetsDto,
    ){
        return await this.petsService.updatePet(petId, updatePetsDto);
    }

    @Get('/petById/:petId')
    @HttpCode(HttpStatus.OK)
    async getPetById(
        @Param('petId', ParseIntPipe) petId: number,
    ){
        return await this.petsService.getPetById(petId);
    }

    @Get('/userPets/:userId')
    async getUserPetsByEmail(
        @Param('userId', ParseIntPipe) userId: number,
    ){
        console.log(userId)
        return await this.petsService.getUserPetsByEmail(userId);
    }

    @Get('/all')
    async getAllPets(
    ){
        return await this.petsService.getAllPets();
    }

}
