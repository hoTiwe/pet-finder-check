import { Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get('/getByEmail')
    @HttpCode(HttpStatus.OK)
    async getUserByEmail(
        @Query('email') email: string,
    ){
        return await this.usersService.findOneByEmail(email);
    }


}
