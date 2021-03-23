import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PeliculaEntity} from "../pelicula/pelicula.entity";

@Entity('EPN_DIRECTOR')
export class DirectorEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'DIRECTOR_NOMBRE'
    })
    nombre: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'DIRECTOR_APELLIDO'
    })
    apellido: string

    @Column({
        type: 'int',
        nullable: false,
        name: 'DIRECTOR_EDAD'
    })
    edad: number

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'DIRECTOR_PAIS'
    })
    pais: string

    @OneToMany(
        type => PeliculaEntity,
        pelicula => pelicula.fkDirector,
        {onDelete: "CASCADE"}
    )
    pelicula: PeliculaEntity[]

}