import { ufRepositorio } from "../repositorios/ufRepositorio";
import { bairroRepositorio } from "../repositorios/bairroRepositorio";
import { enderecoRepositorio } from "../repositorios/enderecosRepositorio";
import { municipioRepositorio } from "../repositorios/municipioRepositorio";
import { pessoaRepositorio } from "../repositorios/pessoaRepositorio";

export interface IRepositorios{
    ufRepositorio :    typeof ufRepositorio;
    bairroRepositorio: typeof bairroRepositorio;
    enderecoRepositorio: typeof enderecoRepositorio;
    pessoaReposotorio: typeof pessoaRepositorio;
    municipioRepositorio: typeof municipioRepositorio;
}