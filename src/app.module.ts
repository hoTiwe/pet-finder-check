import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { SpeciesModule } from './species/species.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BreedsModule } from './breed/breed.module';
import { PetsModule } from './pets/pets.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    SpeciesModule,
    AuthModule,
    UsersModule,
    BreedsModule,
    PetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
