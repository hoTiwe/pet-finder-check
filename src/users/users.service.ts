import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
    ) {}

    async createUser(){

    };

    async findOneById(userId: string): Promise<UsersEntity | undefined>{
        const existUser = await this.usersRepository
            .createQueryBuilder('users')
            .where(`users.id=${userId}`)
            .select([
                "users.id",
                "users.email",
                "users.fullname",
                "users.admin",
                "users.numberPhone"
            ])
            .getOne();
            
        return existUser;
    };

    async findOneByEmail(sentEmail: string): Promise<UsersEntity | undefined>{
        const existUser = await this.usersRepository
            .createQueryBuilder('users')
            .where('users.email = :email', { email: sentEmail })
            .select([
                "users.id",
                "users.email",
                "users.fullname",
                "users.admin",
                "users.numberPhone"
            ])
            .getOne();
        return existUser;
    };

    async updateUserById(){

    }


}
