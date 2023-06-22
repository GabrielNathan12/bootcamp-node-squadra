import { AppDataSource } from "../data-source";
import { Endereco } from '../entities/Endereco';

export const enderecoRepositorio = AppDataSource.getRepository(Endereco);