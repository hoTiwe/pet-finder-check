import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import entities from "src/entities";
import { SpeciesController } from "./species.controller";
import { SpeciesService } from "./species.service";

@Module({
    imports: [TypeOrmModule.forFeature(entities),],
    controllers: [SpeciesController],
    providers: [SpeciesService],
})

export class SpeciesModule {}