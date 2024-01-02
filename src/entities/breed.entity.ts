import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SpeciesEntity } from "./species.entity";
import { PetsEntity } from "./pets.entity";


@Entity({ name: 'breeds' })
export class BreedsEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column()
    name: string;

    @ManyToOne(()=> SpeciesEntity, species => species.breed)
    specie: SpeciesEntity;

    @OneToMany(()=> PetsEntity, (pets)=> pets.breed)
    pets: PetsEntity[]
}
