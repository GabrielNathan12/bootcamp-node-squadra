import { AppDataSource } from "../../data-source";
import { UF } from '../entidades/UF';

export const ufRepositorio = AppDataSource.getRepository(UF);

