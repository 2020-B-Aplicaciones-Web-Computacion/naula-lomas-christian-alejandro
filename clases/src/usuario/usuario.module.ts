import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.contoller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";

@Module({
    imports: [ //Modulos
        TypeOrmModule.forFeature(
            [UsuarioEntity],
            'default'
        )
    ],
    controllers: [ // controladores
        UsuarioController
    ],
    providers: [ //Servicios DECLARADOS
        UsuarioService
    ],
    exports:[ //Servicios EXPORTADOS
        UsuarioService
    ]
})

export class UsuarioModule{

}