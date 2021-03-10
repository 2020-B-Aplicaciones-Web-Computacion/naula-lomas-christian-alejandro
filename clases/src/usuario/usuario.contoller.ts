import {
    Controller,
    Get,
    Header,
    HttpCode,
    Req,
    Res,
    Headers,
    Post,
    Param,
    Put,
    Patch,
    Body,
    Query
} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {FindConditions, FindManyOptions, Like} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {response} from "express";

@Controller('usuario')
export class UsuarioController {

    constructor(
        private _usuarioService: UsuarioService
    ) {
    }

    public usuarios:string[] = [];
    public valorResta: number = 0;
    public nombreCookiePuntaje:string = '';

    @Get('setear_nombre/:nombre')
    nombre(
        @Req()
            request,
        @Param()
            parametrosRuta,
        @Res({passthrough: true})
            response,
    ){
        response.cookie('nombreUsuario', parametrosRuta.nombre);
        this.nombreCookiePuntaje = 'puntaje'+parametrosRuta.nombre;
        if(this.usuarios.indexOf(parametrosRuta.nombre) == -1){
            this.usuarios.push(parametrosRuta.nombre);
            response.cookie(this.nombreCookiePuntaje, 100);
            console.log(this.usuarios);
            return 'Nuevo usuario, Puntaje igual a: 100';
        }
        else{
            console.log("Existente: " + eval('request.cookies.' + this.nombreCookiePuntaje));
            return 'Puntaje igual a: ' + eval('parseInt(request.cookies.' + this.nombreCookiePuntaje + ', 10)');
        }

    }

    //SUMA
    @Get('suma')
    @HttpCode(200)
    suma(
    //hola(
        @Req()
            request,
        @Headers()
            header,
        @Res({passthrough: true})
            response,
    ) {
        let num1:number = parseInt(request.query.numeroUno, 10);
        let num2:number = parseInt(request.query.numeroDos, 10);
        let resultado = (num1 + num2);
        response.cookie(this.nombreCookiePuntaje, eval('request.cookies.' + this.nombreCookiePuntaje) - resultado);
        this.valorResta = eval('request.cookies.' + this.nombreCookiePuntaje) - resultado;
        if(eval('request.cookies.' + this.nombreCookiePuntaje) - resultado > 0){
            return resultado;
        }
        else{
            response.cookie(this.nombreCookiePuntaje, 100);
            return resultado + ' (Credito vencido igual a: ' + this.valorResta + ', se ha setado el puntaje a 100)';
        }
    }

    // RESTA
    @Post('resta')
    @HttpCode(201)
    resta(
        @Res({passthrough: true})
            response,
        @Req()
            request,
    ){
        let num1:number = parseInt(request.body.numeroUno, 10);
        let num2:number = parseInt(request.body.numeroDos, 10);
        response.header('RESULTADO', num1-num2);
        let resultado = num1 - num2;
        response.cookie(this.nombreCookiePuntaje, eval('request.cookies.' + this.nombreCookiePuntaje) - resultado);
        this.valorResta = eval('request.cookies.' + this.nombreCookiePuntaje) - resultado;
        if(eval('request.cookies.' + this.nombreCookiePuntaje) - resultado > 0){
            return 'ok';
        }
        else{
            response.cookie(this.nombreCookiePuntaje, 100);
            return 'Credito vencido igual a: ' + this.valorResta + ', se ha setado el puntaje a 100';
        }
    }


    //MULTIPLICACION
    @Put('multiplicacion/:numeroUno/:numeroDos')
    @HttpCode(200)
    multiplicacion(
        @Req()
            request,
        @Param()
            parametrosRuta,
        @Res({passthrough: true})
            response,
    ){
        let resultado = parametrosRuta.numeroUno * parametrosRuta.numeroDos;
        response.cookie(this.nombreCookiePuntaje, eval('request.cookies.' + this.nombreCookiePuntaje) - resultado);
        this.valorResta = eval('request.cookies.' + this.nombreCookiePuntaje) - resultado;
        if(eval('request.cookies.' + this.nombreCookiePuntaje) - resultado > 0){
            return resultado;
        }
        else{
            response.cookie(this.nombreCookiePuntaje, 100);
            return resultado + ' (Credito vencido igual a: ' + this.valorResta + ', se ha setado el puntaje a 100)';
        }
    }

    //DIVISION
    @Patch('division')
    @HttpCode(201)
    division(
        @Req()
            request,
        @Res({passthrough: true})
            response,
    ){
        let resultado = request.headers.numerouno / request.headers.numerodos;
        response.cookie(this.nombreCookiePuntaje, eval('request.cookies.' + this.nombreCookiePuntaje) - resultado);
        this.valorResta = eval('request.cookies.' + this.nombreCookiePuntaje) - resultado;
        if(eval('request.cookies.' + this.nombreCookiePuntaje) - resultado > 0){
            return resultado;
        }
        else{
            response.cookie(this.nombreCookiePuntaje, 100);
            return resultado + ' (Credito vencido igual a: ' + this.valorResta + ', se ha setado el puntaje a 100)';
        }
    }





    // --------------------------------------------------------------------------------------------------------------------


    @Post('')
    crearUsuario(
        @Body()
            parametrosCuerpo
    ){
        return this. _usuarioService.usuarioEntity.save({
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido
        })
    }

    @Get('usuarios')
    async obtenerUsuarios(
        @Query()
        parametrosConsulta,
        @Res()
        response
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

        // where usuario.id = 3  and usuario.nombre = "Christian"
        let consultaWhereAND: FindConditions<UsuarioEntity>[] = [
            {
                id : 3,
                nombre: "Christian"
            }
        ];

        // where (usuario.nombre = 'Christian') OR
        //  (usurio.apellido = 'Christian')
        /*let consultaWhereOR: FindConditions<UsuarioEntity>[] = [
            {
                nombre: Like(parametrosConsulta.nombre)
            },
            {
                apellido: Like(parametrosConsulta.apellido)
            }
        ];*/

        let consultaWhereOR: FindConditions<UsuarioEntity>[] = [
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

        let consulta: FindManyOptions<UsuarioEntity> = {
            where: consultaWhereOR,
            take: take,
            skip: skip,
            order:{
                id: order === 'ASC' ? 'ASC' : 'DESC'
            }
        }

        let datos = await this._usuarioService.usuarioEntity.findAndCount(consulta);
        response.render('inicio', {
            datos: datos,
            parametrosConsulta: parametrosConsulta
        })
    }



    //Creacion usuario

    @Get('crear-usuario')
    crerUsuario(
        @Res()
        response
    ){
        response.render('usuarios/crear')
    }

    @Post('crear-usuario')
    async crerUsuarioDesdeVista(
        @Body() parametrosCuerpo,
        @Res() response
    ){
        const respuesta = await this._usuarioService.usuarioEntity.save({
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido
        })
        response.redirect('usuarios?mensaje=Se creo el usuario ' +
        parametrosCuerpo.nombre)
        //response.redirect('usuario/usuarios?busqueda=')
    }


}