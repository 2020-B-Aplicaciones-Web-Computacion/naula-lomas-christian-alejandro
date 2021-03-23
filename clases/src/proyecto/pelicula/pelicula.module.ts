import {Module} from "@nestjs/common";
import {PeliculaController} from "./pelicula.controller";
import {PeliculaService} from "./pelicula.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PeliculaEntity} from "./pelicula.entity";

@Module({
    imports: [ //Modulos
        TypeOrmModule.forFeature(
            [PeliculaEntity],
            'default'
        )
    ],
    controllers: [ // controladores
        PeliculaController
    ],
    providers: [ //Servicios DECLARADOS
        PeliculaService
    ],
    exports:[ //Servicios EXPORTADOS
        PeliculaService
    ]
})

export class PeliculaModule{

}