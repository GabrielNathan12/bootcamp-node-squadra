import { AppDataSource } from "../data-source";
import { Pessoa } from '../entities/Pessoa';

export const pessoaRepositorio = AppDataSource.getRepository(Pessoa);