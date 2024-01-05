import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import entities from "src/entities";
import { AuthController } from "./auth.controller";
import { UsersService } from "src/users/users.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
      TypeOrmModule.forFeature(entities),
      JwtModule.register({
        secret: 'secret_key',
        signOptions: {expiresIn: '1h'},
      })],
    controllers: [AuthController],
    providers: [AuthService, UsersService],
  })
  export class AuthModule {}
  
