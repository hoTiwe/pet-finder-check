import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { PetsEntity } from './pets.entity';

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    fullname: string;

    @Column({default: false})
    admin: boolean;

    @Column()
    numberPhone: string;

    @OneToMany(()=> PetsEntity, (pet)=>pet.user)
    pets: PetsEntity[];
}


