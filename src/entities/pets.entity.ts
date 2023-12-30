import { StatusPet } from "src/utils/enums";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity({name: 'pet'})
export class PetEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'smallint'
    })
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    gender: string;

    @Column()
    size: string;

    @Column()
    color: string;

    @Column({default: StatusPet.Active})
    status: StatusPet;

    @Column()
    img: string;

    @Column()
    userId: number;

    @ManyToOne(() => UserEntity, (user) => user.pets)
    user: UserEntity;

    @Column()
    specieId: number;

    @Column()
    breedId: number;
}
