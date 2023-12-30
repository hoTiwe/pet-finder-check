import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { PetEntity } from './pets.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column()
    login: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    fullname: string;

    @Column()
    admin: boolean;

    @Column()
    numberPhone: string;

    @OneToMany(()=> PetEntity, (pet)=>pet.user)
    pets: PetEntity[];
}


