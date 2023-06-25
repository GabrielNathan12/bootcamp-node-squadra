import { AppDataSource } from "../data-source";
import { Municipio } from '../entidades/Municipio';

export const municipioRepositorio = AppDataSource.getRepository(Municipio);