import { AppDataSource } from "../../data-source";
import { Bairro } from '../entidades/Bairro';

export const bairroRepositorio = AppDataSource.getRepository(Bairro);