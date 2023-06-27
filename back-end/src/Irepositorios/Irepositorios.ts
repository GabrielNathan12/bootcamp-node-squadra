import { UF } from "../entidades/UF";
import { Bairro } from "../entidades/Bairro";

import { Repository } from "typeorm";
import { Endereco } from "../entidades/Endereco";
import { Pessoa } from "../entidades/Pessoa";
import { Municipio } from "../entidades/Municipio";
export interface IRepositorios{
    ufRepositorio : Repository<UF>;
    bairroRepositorio: Repository<Bairro>;
    enderecoRepositorio: Repository<Endereco>;
    pessoaRepositorio:  Repository<Pessoa>;
    municipioRepositorio: Repository<Municipio>;
}