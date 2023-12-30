import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BreedsEntity } from "./breed.entity";


@Entity({name: "species"})
export class SpeciesEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        type: 'smallint',

    })
    id: number;

    @Column()
    name: string;

    @OneToMany(()=> BreedsEntity, breed => breed.specie)
    breed: BreedsEntity[];

}