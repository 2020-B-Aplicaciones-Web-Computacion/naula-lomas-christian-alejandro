import {BadRequestException, Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {PeliculaService} from "./pelicula.service";
import {FindConditions, FindManyOptions, Like} from "typeorm";
import {DirectorEntity} from "../director/director.entity";
import {PeliculaEntity} from "./pelicula.entity";
import {formCrearPelDto} from "../dto/form-crearPel.dto";
import {validate} from "class-validator";

@Controller('pelicula')

export class PeliculaController{

    constructor(
        private _peliculaSercice: PeliculaService
    ) {
    }

    public skipt: number = 0

    @Get('')
    hola(){
        return 'Peliculaaaaaaaas';
    }


    @Get('obtener')
    async ObtenerPeliculas(
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
        let condicion: FindConditions<PeliculaEntity>[] = [
            {
                fkDirector: Like(parametrosConsulta.idfk),
                nombre: Like(parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%')
            }
        ]

        let consulta2: FindManyOptions<PeliculaEntity> = {
            where: condicion
        }

        let tamano = await this._peliculaSercice.peliculaService.count(consulta2);
        //console.log(tamano)

        if(parametrosConsulta.siguiente == 'si' && (this.skipt+10) < tamano){
            this.skipt = this.skipt + 10
        }
        else if (parametrosConsulta.anterior == 'si' && this.skipt >= 10){
            this.skipt = this.skipt - 10
        }
        else if(parametrosConsulta.siguiente == null){
            this.skipt = 0
        }


        let consulta: FindManyOptions<PeliculaEntity> = {
            where: condicion,
            take: take,
            skip: this.skipt,
            order:{
                id: order === 'ASC' ? 'ASC' : 'DESC'
            }
        }



        let datos = await this._peliculaSercice.peliculaService.findAndCount(consulta);
        response.render('proyecto/pelicula/listadoPel', {
            datos: datos,
            parametrosConsulta: parametrosConsulta
        })

    }

    @Get('crear-pelicula')
    crerPelicula(
        @Res()
            response,
        @Query() paramentrosConsulta
    ){
        response.render('proyecto/pelicula/crearPel' , {
            parametrosConsulta: paramentrosConsulta
        })
    }

    @Post('crear-pelicula')
    async crerPeliculaDesdeVista(
        @Body() parametrosCuerpo,
        @Query() paramentrosConsulta,
        @Res() response
    ){
        const dtoFormCrearPel = new formCrearPelDto()
        dtoFormCrearPel.nombre = parametrosCuerpo.nombre
        dtoFormCrearPel.genero = parametrosCuerpo.genero
        dtoFormCrearPel.duracion = Number(parametrosCuerpo.duracion)
        dtoFormCrearPel.anio = Number(parametrosCuerpo.anio)

        const errores = await validate(dtoFormCrearPel)

        if(errores.length > 0){
            console.error(errores.toString())
            throw new BadRequestException('No envía correctamente los parámetros')
        }else{
            const respuesta = await this._peliculaSercice.peliculaService.save({
                nombre: parametrosCuerpo.nombre,
                genero: parametrosCuerpo.genero,
                duracion: parametrosCuerpo.duracion,
                anio: parametrosCuerpo.anio,
                fkDirector: parametrosCuerpo.idfk
            })
            response.redirect('http://localhost:3000/pelicula/obtener?idfk='+parametrosCuerpo.idfk)
        }

    }

    @Get('editar-pelicula')
    editarPelicula(
        @Res() response,
        @Query() parametrosConsulta
    ){
        response.render('proyecto/pelicula/editarPel',{
            parametrosConsulta: parametrosConsulta
        })
    }

    @Post('editar-pelicula')
    async editarPeliculasVista(
        @Res() response,
        @Body() parametrosCuerpo,
        @Query() parametrosConsulta
    ){
        const dtoFormCrearPel = new formCrearPelDto()
        dtoFormCrearPel.nombre = parametrosCuerpo.nombre
        dtoFormCrearPel.genero = parametrosCuerpo.genero
        dtoFormCrearPel.duracion = Number(parametrosCuerpo.duracion)
        dtoFormCrearPel.anio = Number(parametrosCuerpo.anio)

        const errores = await validate(dtoFormCrearPel)

        if(errores.length > 0){
            console.error(errores.toString())
            throw new BadRequestException('No envía correctamente los parámetros')
        }else{
            const respuesta = await this._peliculaSercice.peliculaService.query(
                "UPDATE EPN_PELICULA SET " +
                "PELICULA_NOMBRE='" + parametrosCuerpo.nombre.toString() + "', " +
                "PELICULA_GENERO='" + parametrosCuerpo.genero.toString() + "', " +
                "PELICULA_DURACION=" + parametrosCuerpo.duracion + ", " +
                "PELICULA_ANIO=" + parametrosCuerpo.anio + " " +
                "WHERE id="+ parametrosCuerpo.id
            )

            response.redirect('obtener?idfk='+parametrosCuerpo.idfk)
        }
    }


    @Get('eliminar-pelicula')
    async elimarPelicula(
        @Res() response,
        @Query() parametrosConsulta
    ){
        const respuesta = await this._peliculaSercice.
        peliculaService.delete(
            parametrosConsulta.id
        )
        response.redirect('obtener?idfk=' + parametrosConsulta.idfk)
    }

}