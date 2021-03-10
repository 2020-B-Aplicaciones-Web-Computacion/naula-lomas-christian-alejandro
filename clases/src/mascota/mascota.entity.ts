import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Entity('EPN_MASCOTA')
export class MascotaEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: String

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.mascota
    )
    fkUsuario;

}