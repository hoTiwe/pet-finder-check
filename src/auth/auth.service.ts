import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "src/entities";
import { UsersDto } from "src/users/users.dto";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AuthDto } from "./auth.dto";
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private jwtService: JwtService
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
    console.log('admin', createUserDto.admin)
    let isAdmin: boolean = false;
    if(createUserDto.admin) isAdmin = true;
    console.log(isAdmin)
    const newUset = this.usersRepository.create({ ...createUserDto, password: hashPassword, admin: isAdmin});

    return await this.usersRepository.save(newUset);
  }

  async login(createAuthDto: AuthDto){
    const candidate: UsersEntity = await this.usersRepository.findOne({
        where: {
            email: createAuthDto.email,
        }
    })
    if(!candidate){
        throw new HttpException('Такого пользователя не существует', HttpStatus.BAD_REQUEST);
    }

    const validPassword = bcrypt.compareSync(createAuthDto.password, candidate.password);
    if(!validPassword) {
        throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST);
    }
    console.log(createAuthDto.email);
    const payload = {username: candidate.email, sub: candidate.id, isAdmin: candidate.admin, name: candidate.fullname, phoneNumber: candidate.numberPhone}

    //return await this.usersService.findOneByEmail(createAuthDto.email);
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

}
