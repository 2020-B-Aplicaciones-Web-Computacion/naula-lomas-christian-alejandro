import {Body, Controller, Post} from "@nestjs/common";
import {UsuarioService} from "../usuario/usuario.service";
import {MascotaService} from "./mascota.service";

@Controller('mascota')
export class MascotaController{

    constructor(
        private _mascotaService: MascotaService
    ) {
    }

    @Post('')
    async crearMascotaRest(
        @Body() parametrosCuerpo
    ){
        return await this._mascotaService.mascotaEntity.save({
            nombre: parametrosCuerpo.nombre,
            fkUsuario: 1,
        })
    }


}