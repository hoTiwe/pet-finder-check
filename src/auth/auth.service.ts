import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "src/entities";
import { UsersDto } from "src/users/users.dto";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registration(createUserDto: UsersDto){
    const candidate: UsersEntity = await this.usersRepository.findOne({
        where: {
            email: createUserDto.email,
        }
    })
    if(candidate){
        throw new HttpException('Такой пользователь уже существует', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = bcrypt.hashSync(createUserDto.password, 12);
    console.log("password=", createUserDto.password)
    console.log("hashPassword=",hashPassword)
    const newUset = this.usersRepository.create({ ...createUserDto, password: hashPassword });

    return await this.usersRepository.save(newUset);
  }

}
