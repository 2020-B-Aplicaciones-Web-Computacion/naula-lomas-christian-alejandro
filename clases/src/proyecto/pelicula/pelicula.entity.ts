import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {DirectorEntity} from "../director/director.entity";

@Entity('EPN_PELICULA')
export class PeliculaEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'PELICULA_NOMBRE'
    })
    nombre: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        name: 'PELICULA_GENERO'
    })
    genero: string

    @Column({
        type: 'int',
        nullable: false,
        name: 'PELICULA_DURACION'
    })
    duracion: number

    @Column({
        type: 'varchar',
        length: 4,
        nullable: false,
        name: 'PELICULA_ANIO'
    })
    anio: number

    @ManyToOne(
        type => DirectorEntity,
        director => director.pelicula,
        {onDelete: "CASCADE"}
    )
    fkDirector;
}