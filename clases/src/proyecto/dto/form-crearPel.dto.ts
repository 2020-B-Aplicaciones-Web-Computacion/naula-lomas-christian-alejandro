import {IsNotEmpty, IsNumber, IsPositive, IsString, Max, MaxLength, Min, MinLength} from "class-validator";

export class formCrearPelDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(80)
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    genero: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(60)
    @Max(210)
    duracion: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(1700)
    @Max(2021)
    anio: number;

}