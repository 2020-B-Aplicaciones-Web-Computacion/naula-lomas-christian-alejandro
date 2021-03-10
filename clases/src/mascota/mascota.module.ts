import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {MascotaEntity} from "./mascota.entity";
import {MascotaService} from "./mascota.service";
import {MascotaController} from "./mascota.controller";


@Module({
    imports: [ //Modulos
        TypeOrmModule.forFeature(
            [MascotaEntity],
            'default'
        )
    ],
    controllers: [ // controladores
        MascotaController
    ],
    providers: [ //Servicios DECLARADOS
        MascotaService
    ],
    exports:[ //Servicios EXPORTADOS
        MascotaService
    ]
})

export class MascotaModule{

}