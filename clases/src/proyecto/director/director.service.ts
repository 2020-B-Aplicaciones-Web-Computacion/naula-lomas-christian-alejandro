import {Injectable} from "@nestjs/common";
import {DirectorEntity} from "./director.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class DirectorService{
    constructor(
        @InjectRepository(DirectorEntity)
        public directorEntity: Repository<DirectorEntity>
    ) {
    }
}