import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersDto } from "src/users/users.dto";
import { AuthDto } from "./auth.dto";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('/register')
    @HttpCode(HttpStatus.OK)
    async registration(
        @Body() createUserDto: UsersDto,
    ){
        return await this.authService.registration(createUserDto);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() createAuthDto: AuthDto,
    ){
        return await this.authService.login(createAuthDto);
    }


}
