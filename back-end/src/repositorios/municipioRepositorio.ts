import { AppDataSource } from "../data-source";
import { Municipio } from '../entities/Municipio';

export const municipioRepositorio = AppDataSource.getRepository(Municipio);