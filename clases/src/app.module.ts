import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MascotaModule} from "./mascota/mascota.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MascotaEntity} from "./mascota/mascota.entity";
import {DirectorModule} from "./proyecto/director/director.module";
import {PeliculaModule} from "./proyecto/pelicula/pelicula.module";
import {DirectorEntity} from "./proyecto/director/director.entity";
import {PeliculaEntity} from "./proyecto/pelicula/pelicula.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot({
         type: 'mysql',
         port: 3010,
         username: 'epn',
         password: 'epn12345678',
         database: 'web',
         dropSchema: false,
         synchronize: true,
         entities: [
             UsuarioEntity,
             MascotaEntity,
             DirectorEntity,
             PeliculaEntity
         ]
      }),
      MascotaModule,
      UsuarioModule,
      DirectorModule,
      PeliculaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
