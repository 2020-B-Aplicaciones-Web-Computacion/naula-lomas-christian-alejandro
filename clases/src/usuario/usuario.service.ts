import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {Repository} from "typeorm";

@Injectable()
export class UsuarioService{

    constructor(//inyectar dependencias
        @InjectRepository(UsuarioEntity)
                public usuarioEntity: Repository<UsuarioEntity>) {

    }

}