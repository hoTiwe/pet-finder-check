import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BreedEntity } from "./breed.entity";


@Entity({name: "species"})
export class SpeciesEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        type: 'smallint',

    })
    id: number;

    @Column()
    name: string;

    @OneToMany(()=> BreedEntity, breed => breed.specie)
    breed: BreedEntity[];

}