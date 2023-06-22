import { AppDataSource } from "../data-source";
import { UF } from '../entities/UF';

export const ufRepositorio = AppDataSource.getRepository(UF);