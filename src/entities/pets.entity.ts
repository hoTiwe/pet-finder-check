import { StatusPet } from "src/utils/enums";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsersEntity } from "./user.entity";


@Entity({name: 'pets'})
export class PetsEntity extends BaseEntity {
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

    @ManyToOne(() => UsersEntity, (user) => user.pets)
    user: UsersEntity;

    @Column()
    specieId: number;

    @Column()
    breedId: number;
}
