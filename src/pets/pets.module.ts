import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import entities from "src/entities";
import { PetsController} from "./pets.controller";
import { PetsService} from "./pets.service";

@Module({
    imports: [TypeOrmModule.forFeature(entities),],
    controllers: [PetsController],
    providers: [PetsService],
})

export class PetsModule {}