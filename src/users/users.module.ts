import { UsersService } from "./users.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import entities from "src/entities";

@Module({
    imports: [TypeOrmModule.forFeature(entities),],
    controllers: [],
    providers: [UsersService],
})

export class UsersModule {}
