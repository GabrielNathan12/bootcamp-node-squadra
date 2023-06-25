import { AppDataSource } from "../data-source";
import { Endereco } from '../entidades/Endereco';

export const enderecoRepositorio = AppDataSource.getRepository(Endereco);