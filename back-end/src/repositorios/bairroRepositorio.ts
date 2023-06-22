import { AppDataSource } from "../data-source";
import { Bairro } from '../entities/Bairro';

export const bairroRepositorio = AppDataSource.getRepository(Bairro);