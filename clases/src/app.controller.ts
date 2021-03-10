import {BadRequestException, Controller, ForbiddenException, Get, Param, Query, Req, Session} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('login')
    login(
        @Session() session,
        @Query() parametrosConsulta
  ):string {
      if (parametrosConsulta.nombre && parametrosConsulta.apellido){
          session.usuarios = {
              nombre:parametrosConsulta.nombre,
              apellido: parametrosConsulta.apellido,
          }
          if(parametrosConsulta.apellido == 'naula'){
              session.usuarios.esAdministrador = true;
          }
          return 'se loggeo el usuario';
      }
      else {
          throw new BadRequestException('NO ENVÍA NOMBRE Y APELLIDO');
      }
  }

  @Get('quien-soy')
    quiensoy(
        @Session() session,
    ):string{
      if(session.usuarios){
          return session.usuarios.nombre + ' ' + session.usuarios.apellido
      }
      else{
          return 'no te haz logeado';
      }
  }

  @Get('logout')
    logout(
        @Session() session,
        @Req() request
    ):string{
        session.usuarios = undefined;
        request.session.destroy();
        return 'gracias por visitarnos';
    }

  @Get('protegido')
    protegido(
        @Session() session,
    ):string{
        if(session.usuarios){
            if(session.usuarios.esAdministrador){
                return 'CONTENIDO SUPER OCULTO';
            }
            else{
                throw new ForbiddenException('No tienes rol de Admin');
            }
        }
        else{
            throw new ForbiddenException('No tienes rol de Admin');
        }
    }
}



/*abstract class Nombre {
  public nombrePropiedad?: string; // undefined
  private apellidoPropiedad: string = 'Eguez';
  protected edad = 1;
  static comun: number = 10;

  propiedadPublica: string;

  constructor(
      propiedadPublicaParametro:string,
      public propiedadRapido:string
  ) {
    this.propiedadPublica = propiedadPublicaParametro;

  }

  public funcionPublica(parametroString: string): void {
    // no hay return = undefined
  }

  private funcionPrivada(parametroString: string, //? = puede ser undefined
                         parametroNumber: number) { // omitir :void (defecto)
    // no hay return = undefined
  }

  protected funcionProtected(): number {
        return 1;
  }

  static funcionEstatica(): string {
        return 'string';
  }


}
*/


//VARIABLES PRIMITIVAS

//mutable (puede camuar en el tiempo)
//var varibaleUno -> no utilizar, antiguas
/*let variableDos
variableDos = 1;  //OK

//inmutable (no puede camuar en el tiempo)
const variableTres = 2;
variableTres = 1;  //NO OK*/



//tipos de variables
//texto - Strings
const texto: string = "";
const textoConComillasSimples: string = '';

//números (enteros, flotantes, doubles)
const numeroEntero: number = 1;
const numeroFlotante: number = 1.25;

//booleanos
const boleano: boolean =  true; //false

//clases
const fecha: Date = new Date();

//no definido (no hay0 nada) utilizar el "undefined" por encima del "null"
const noDefinido = undefined;
const noHayNada = null;

class Usuario{
    constructor(
        public nombre:string,
        public apellido:string
    ) {
    }
}

const usuario: Usuario = new Usuario("christian", "naula");
usuario.nombre = "Alejandro";
usuario.apellido = "Lomas";

interface UsuarioInterface{
    nombre: string,
    apellido: string,
    edad?:number;
}

let objetoUsuario: UsuarioInterface = {
    nombre: 'Christian',
    apellido: 'Naula',
};

objetoUsuario.nombre;
objetoUsuario.apellido;
objetoUsuario.edad;


//PUNTEROS Y REFERENCIAS

//PRIMITIVAS

/*let edadAntigua = 22;
let otraEdad = edadAntigua;
otraEdad = 60; //edadAntigua = 22;*/


//OBJETOS
let objetoEdad = {
    edad: 22
};

let otraEdad = objetoEdad;

otraEdad.edad = 60;

//console.log('objetoEdad', objetoEdad);


//Clonacion
/*let otraEdadObjetoClonado = {...objetoEdad}
otraEdadObjetoClonado.edad = 40*/


//Arreglos
/*const arregloTodo = [1, '', true, new Date];
const arregloNumeros: number[] = [0, 1, 2, 3];

const arregloNumerosClonados: number[] = [...arregloNumeros];

const indice = arregloNumeros.findIndex(
    (numero: number) => {  // funcion anonima porque no tiene nombre
        return numero === 3; // Condicion
    }
);*/
/*console.log('arregloNumeros', arregloNumeros);
console.log('indice', indice);
arregloNumeros[indice] = 6;
console.log('arregloNumeros', arregloNumeros);
//agregar al final
arregloNumeros.push(0);
//agregal al inicio
arregloNumeros.unshift(10);
arregloNumeros.unshift(88);*/


//console.log('arregloNumeros', arregloNumeros);

// Condiciones Truty y Falsy

//el cero(0) o "" es falso -> Falsy
//todos numeros - el 0 son verdaderos -> Truty










