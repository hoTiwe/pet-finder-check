import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SpeciesEntity } from "src/entities";
import { Repository } from "typeorm";
import { SpeciesDto } from "./species.dto";


@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(SpeciesEntity)
    private readonly storiesRepository: Repository<SpeciesEntity>,
  ) {}

  async getSpecies(){

  }

  async getSpecieById(){

  }

  async getSpecieWithBreed(){

  }

  async createSpecie(createSpecieDto: SpeciesDto){
    const existSpecie: SpeciesEntity = await this.storiesRepository.findOne({
        where:{
            name: createSpecieDto.name,
        }
    })
    if(existSpecie){
        console.log('specie exist')
        throw new HttpException('Specie exist', HttpStatus.BAD_REQUEST)
    }
    const newSpecie: SpeciesEntity = await this.storiesRepository.create({
        ...createSpecieDto,
    })

    return await this.storiesRepository.save(newSpecie);

  }

  async updateSpecie(){

  }

  async deleteSpecie(){

  }
}
