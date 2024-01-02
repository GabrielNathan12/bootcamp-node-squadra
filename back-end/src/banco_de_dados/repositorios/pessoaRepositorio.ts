import { AppDataSource } from "../../data-source";
import { Pessoa } from '../entidades/Pessoa';

export const pessoaRepositorio = AppDataSource.getRepository(Pessoa);