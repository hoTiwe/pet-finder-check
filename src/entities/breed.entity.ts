import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SpeciesEntity } from "./species.entity";


@Entity({ name: 'breeds' })
export class BreedsEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column()
    speciesId: number;

    @ManyToOne(()=> SpeciesEntity, species => species.breed)
    specie: SpeciesEntity;
}
