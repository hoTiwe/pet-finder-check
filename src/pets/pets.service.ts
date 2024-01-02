import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BreedsEntity, PetsEntity, SpeciesEntity, UsersEntity } from "src/entities";
import { Repository } from "typeorm";
import { PetsDto, UpdatePetsDto } from "./pets.dto";


@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(PetsEntity)
    private readonly petsRepository: Repository<PetsEntity>,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    @InjectRepository(BreedsEntity)
    private readonly breedsRepository: Repository<BreedsEntity>,
  ) {}

  async createSpecie(createPetsDto: PetsDto, userId: number, breedId: number){
    const existUser: UsersEntity = await this.usersRepository.findOne({
      where:{
        id: userId
      }
    });
    if(!existUser)
      throw new HttpException('Такого пользователя не существует', HttpStatus.BAD_REQUEST)

    const existBreed: BreedsEntity = await this.breedsRepository.findOne({
      where:{
        id: breedId,
      }
    });

    if(!existBreed)
      throw new HttpException('Такой породы не существует', HttpStatus.BAD_REQUEST)

    const newPet: PetsEntity = this.petsRepository.create({
      ...createPetsDto,
      user: existUser,
      breed: existBreed,
    });

    return await this.petsRepository.save(newPet);

  }

  async updatePet(petId: number, updatePetsDto: UpdatePetsDto){
    const existPet: PetsEntity = await this.petsRepository.findOne({where: {id: petId}});
    if(!existPet){
      throw new HttpException("Такого питомца не существует", HttpStatus.BAD_REQUEST);
    }
    return await this.petsRepository.update({id: existPet.id}, updatePetsDto,);
  }

  async getPetById(petId: number){
      const existPet = await this.petsRepository
      .createQueryBuilder('pets')
      .where("pets.id=:Id", {Id: petId})
      .leftJoinAndSelect('pets.breed', 'breed')
      .leftJoinAndSelect('breed.specie', 'specie')
      .leftJoinAndSelect('pets.user', 'user')
      .select([
          "pets.id",
          "pets.name",
          "pets.description",
          "pets.gender",
          "pets.size",
          "pets.color",
          "pets.status",
          "pets.img",
          "user.id",
          "user.email",
          "user.fullname",
          "breed.name",
          "specie.name"

      ])
      .getOne();
      console.log("existPet=", existPet)
      if(!existPet)
        throw new HttpException("Такого питомца не существует", HttpStatus.BAD_REQUEST);
      return existPet;
  }

  async getUserPetsByEmail(userId: number){
    const existPets = await this.usersRepository
    .createQueryBuilder('users')
    .select([
      'users.id',
      'users.email',
      'users.fullname',
      'users.admin',
      'users.numberPhone',
    ])
    .where("users.id = :Id", { Id: userId })
    .leftJoinAndSelect('users.pets', 'pets')
    .leftJoinAndSelect('pets.breed', 'breed')
    .leftJoinAndSelect('breed.specie', 'specie')
    .addSelect(
      [
      'pets.id', 
      'pets.name', 
      'pets.description', 
      'pets.color',
      'pets.size',
      'pets.status',
      'pets.img',
      'breed.id',
      'breed.name',
      'specie.id',
      'specie.name',
    ])
    .getOne();

    return existPets;
  }

  async getAllPets():Promise<PetsEntity[] | undefined>{
    const existPets = await this.petsRepository
    .createQueryBuilder('pets')
    .leftJoinAndSelect('pets.breed', 'breed')
    .leftJoinAndSelect('breed.specie', 'specie')
    .leftJoinAndSelect('pets.user', 'user')
    .select([
        "pets.id",
        "pets.name",
        "pets.description",
        "pets.gender",
        "pets.size",
        "pets.color",
        "pets.status",
        "pets.img",
        "user.id",
        "user.email",
        "user.fullname",
        "breed.name",
        "specie.name"
    ])
    .getMany();

    return existPets;
  }
}
