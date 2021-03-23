import {BadRequestException, Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {DirectorService} from "./director.service";
import {DirectorEntity} from "./director.entity";
import {FindConditions, FindManyOptions, FindOneOptions, Like} from "typeorm";
import {Dir} from "fs";
import {formCrearDirDto} from "../dto/form-crearDir.dto";
import {validate} from "class-validator";

@Controller('director')

export class DirectorController{

    constructor(
        private _directorService: DirectorService
    ) {
    }

    public skipt: number = 0

    /*@Get('')
    hola(){
        return 'Directooooooooooooot';
    }*/

    @Post('crear')
    crear(
        @Body()
            parametrosCuerpo
    ){

        return this. _directorService.directorEntity.save({
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido,
            edad: parametrosCuerpo.edad,
            pais: parametrosCuerpo.pais,
        })
        //return 'Crear papa';
    }

    @Get('obtener')
    async ObtenerDirectores(
        @Query() parametrosConsulta,
        @Res() response
    ){
        let take = 10; //dame solo 10 registros
        let skip = 0; // me salto 0 registros
        let order = 'ASC';
        if(parametrosConsulta.skip){
            skip = parametrosConsulta.skip
        }
        if(parametrosConsulta.take){
            take = parametrosConsulta.take
        }
        if(parametrosConsulta.order){
            order = parametrosConsulta.order as 'ASC' | 'DES';
        }

        let consultaWhereOR: FindConditions<DirectorEntity>[] = [
            {
                nombre: Like(
                    parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'
                ),
                // estado:'SOLTERO' // Cuando se repiten en los objetos es un AND
            }, // OR
            {
                apellido: Like(parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'
                ),
                // estado:'SOLTERO' // Cuando se repiten en los objetos es un AND
            }
        ];

        let tamano = await this._directorService.directorEntity.count();
        //console.log(tamano)

        if(parametrosConsulta.siguiente == 'si' && (this.skipt+10) < tamano){
            this.skipt = this.skipt + 10
        }
        else if (parametrosConsulta.anterior == 'si' && this.skipt >= 10){
            this.skipt = this.skipt - 10
        }
        else {
            this.skipt = 0
        }

        let consulta: FindManyOptions<DirectorEntity> = {
            where: consultaWhereOR,
            take: take,
            skip: skip,
            order:{
                id: order === 'ASC' ? 'ASC' : 'DESC'
            }
        }
        let datos = await this._directorService.directorEntity.findAndCount(consulta);
        response.render('proyecto/director/listadoDir', {
            datos: datos,
            parametrosConsulta: parametrosConsulta
        })

    }

    @Get('crear-director')
    crerUsuario(
        @Res()
            response
    ){
        response.render('proyecto/director/crearDir')
    }

    @Post('crear-director')
    async crerUsuarioDesdeVista(
        @Body() parametrosCuerpo,
        @Res() response
    ){
        const dtoFormCrearDir = new formCrearDirDto();
        dtoFormCrearDir.nombre = parametrosCuerpo.nombre
        dtoFormCrearDir.apellido = parametrosCuerpo.apellido
        dtoFormCrearDir.edad = Number(parametrosCuerpo.edad) //parametrosCuerpo.edad as number
        dtoFormCrearDir.pais = parametrosCuerpo.pais

        const errores = await validate(dtoFormCrearDir)
        if(errores.length > 0){
            console.error(errores.toString())
            throw new BadRequestException('No se envían los parámetros adecuadamente')
        }else{
            const respuesta = await this._directorService.directorEntity.save({
                nombre: parametrosCuerpo.nombre,
                apellido: parametrosCuerpo.apellido,
                edad: parametrosCuerpo.edad,
                pais: parametrosCuerpo.pais,
            })
            response.redirect('obtener')
        }
    }

    @Get('editar-director')
    editarUsuario(
        @Res() response,
        @Query() parametrosConsulta
    ){
        response.render('proyecto/director/editarDir',{
            parametrosConsulta: parametrosConsulta
        })
    }

    @Post('editar-director')
    async editarUsuarioVista(
        @Res() response,
        @Body() parametrosCuerpo,
        @Query() parametrosConsulta
    ){
        const dtoFormCrearDir = new formCrearDirDto();
        dtoFormCrearDir.nombre = parametrosCuerpo.nombre
        dtoFormCrearDir.apellido = parametrosCuerpo.apellido
        dtoFormCrearDir.edad = Number(parametrosCuerpo.edad) //parametrosCuerpo.edad as number
        dtoFormCrearDir.pais = parametrosCuerpo.pais

        const errores = await validate(dtoFormCrearDir)
        if(errores.length > 0){
            console.error(errores.toString())
            throw new BadRequestException('No se envían los parámetros adecuadamente')
        }else{
            const respuesta = await this._directorService.directorEntity.query(
                "UPDATE EPN_DIRECTOR SET " +
                "DIRECTOR_NOMBRE='" + parametrosCuerpo.nombre.toString() + "', " +
                "DIRECTOR_APELLIDO='" + parametrosCuerpo.apellido.toString() + "', " +
                "DIRECTOR_EDAD=" + parametrosCuerpo.edad + ", " +
                "DIRECTOR_PAIS='" + parametrosCuerpo.pais.toString() + "' " +
                "WHERE id="+ parametrosConsulta.id
            )
            response.redirect('obtener')
        }
    }

    @Get('eliminar-director')
    async elimarDirector(
        @Res() response,
        @Query() parametrosConsulta
    ){

        const respuesta = await this._directorService.
        directorEntity.delete(
            parametrosConsulta.id
        )
        response.redirect('obtener')
    }

}