import { UsersService } from "./users.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import entities from "src/entities";
import { UsersController } from "./users.controller";

@Module({
    imports: [TypeOrmModule.forFeature(entities),],
    controllers: [UsersController],
    providers: [UsersService],
})

export class UsersModule {}
