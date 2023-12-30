import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersDto } from "src/users/users.dto";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('/register')
    @HttpCode(HttpStatus.OK)
    async createUser(
        @Body() createUserDto: UsersDto,
    ){
        return await this.authService.registration(createUserDto);
    }


}
