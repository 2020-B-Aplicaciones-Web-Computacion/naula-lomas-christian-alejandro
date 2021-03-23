import {Module} from "@nestjs/common";
import {DirectorController} from "./director.controller";
import {DirectorService} from "./director.service";
import {DirectorEntity} from "./director.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [ //Modulos
        TypeOrmModule.forFeature(
            [DirectorEntity],
            'default'
        )
    ],
    controllers: [ // controladores
        DirectorController
    ],
    providers: [ //Servicios DECLARADOS
        DirectorService
    ],
    exports:[ //Servicios EXPORTADOS
        DirectorService
    ]
})

export class DirectorModule{

}