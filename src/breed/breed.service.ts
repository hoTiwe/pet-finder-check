import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BreedsEntity, SpeciesEntity } from "src/entities";
import { Repository } from "typeorm";
import { BreedDto } from "./breed.dto";



@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(SpeciesEntity)
    private readonly speciesRepository: Repository<SpeciesEntity>,
    @InjectRepository(BreedsEntity)
    private readonly breedsRepository: Repository<BreedsEntity>,

  ) {}

  async addBreed(createBreedDto: BreedDto){
    const existSpecie = await this.speciesRepository.findOne({
        where:{
            name: createBreedDto.specie,
        }
    })

    if(!existSpecie){
        console.log('specie exist')
        throw new HttpException('Такого вида не существует', HttpStatus.BAD_REQUEST)
    }

    const newBreed: BreedsEntity = this.breedsRepository.create({
        name: createBreedDto.name,
        specie: existSpecie,
    });

    return await this.breedsRepository.save(newBreed);
  }
  
}

