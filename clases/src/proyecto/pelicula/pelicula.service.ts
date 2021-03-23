import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PeliculaEntity} from "./pelicula.entity";
import {Repository} from "typeorm";


@Injectable()
export class PeliculaService{
    constructor(
        @InjectRepository(PeliculaEntity)
            public peliculaService: Repository<PeliculaEntity>
    ) {
    }
}