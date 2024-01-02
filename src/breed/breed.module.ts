import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import entities from "src/entities";
import { BreedsController } from "./breed.controller";
import { SpeciesService } from "src/species/species.service";
import { BreedsService } from "./breed.service";


@Module({
    imports: [TypeOrmModule.forFeature(entities),],
    controllers: [BreedsController],
    providers: [
        BreedsService,
        SpeciesService,
    ],
})

export class BreedsModule {}
