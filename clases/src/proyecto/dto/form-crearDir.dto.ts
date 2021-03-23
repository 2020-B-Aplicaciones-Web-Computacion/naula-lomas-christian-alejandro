import {
    IsInt,
    IsNotEmpty,
    IsNumber, IsNumberString,

    IsPositive,
    IsString,
    Max,
    MaxLength,
    Min,
    MIN,
    MinLength
} from "class-validator";
import {MoreThan} from "typeorm";

export class formCrearDirDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(80)
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(80)
    apellido: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(25)
    @Max(100)
    edad: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(35)
    pais: string;

}