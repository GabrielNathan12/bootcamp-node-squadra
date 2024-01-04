import { bairroRepositorio } from "../../../banco_de_dados/repositorios/bairroRepositorio";
import { municipioRepositorio } from "../../../banco_de_dados/repositorios/municipioRepositorio";
import { IBairro } from "../../vo/IBairro";

export class ServicosBairros{

    public async criarNovoBairro(bairro: IBairro){
        const repositorio = bairroRepositorio;
        const novoBairro = repositorio.create({municipio: {codigoMunicipio: bairro.codigoMunicipio},
                                                            nome: bairro.nome, status: bairro.status});
        await repositorio.save(novoBairro);
        return await this.listarBairros();
    }

    public async procurarMunicipioPeloCodigoMunicipio(codigoMunicipio: number){
        const repositorio = municipioRepositorio;
        const resultado = await repositorio.findOne({where: {codigoMunicipio:codigoMunicipio}});
        return resultado;
    }

    public async procurarBairroPeloCodigoBairro(codigoBairro: number){
        const repositorio = bairroRepositorio;
        const resultado = await repositorio.findOne({where: {codigoBairro:codigoBairro}});
        return resultado;
    }

    public async atualizarBairro(bairro: IBairro, codigoBairro: number, codigoMunicipio: number){
        const bairroExiste = await this.procurarBairroPeloCodigoBairro(codigoBairro);
        const municipioExiste = await this.procurarMunicipioPeloCodigoMunicipio(codigoMunicipio);

        if(!bairroExiste){
            return null;
        }
        if(!municipioExiste){
            return null;
        }

        bairroExiste.nome = bairro.nome;
        bairroExiste.municipio = municipioExiste;
        bairroExiste.status = bairro.status;

        await bairroRepositorio.save(bairroExiste);
        return await this.listarBairros();
    }

    public async existeDuplicadasBairro(nome:string, codigoMunicipio: number){
        const repositorio = bairroRepositorio;

        const resultado = await repositorio.findOne({
            where: {nome:nome, municipio: {codigoMunicipio: codigoMunicipio}}
        });
        return resultado;
    }

    public async listarBairros(){

        const repositorio = bairroRepositorio;

        const lista = await repositorio.find({select: ['codigoBairro', 'nome',"status"],relations: ['municipio']});

        const resultado = lista.map(item =>({
            codigoBairro: item.codigoBairro,
            codigoMunicipio: item.municipio.codigoMunicipio,
            nome: item.nome,
            status: item.status

        }));
        return resultado;
    }

    public async listarBairrosPorParametros(parametros: any){
        const repositorio = bairroRepositorio;
        let condicoes: any = {};

        if(parametros.codigoBairro){
            condicoes.codigoBairro = parametros.codigoBairro;
        }
        if(parametros.codigoMunicipio){
            condicoes.municipio = {codigoMunicipio: parametros.codigoMunicipio};
        }
        if(parametros.nome){
            condicoes.nome = parametros.nome;
        }
        if(parametros.status){
            condicoes.status = parametros.status;
        }

        const lista = await repositorio.find({where: condicoes, relations: ['municipio']});

        const resultado = lista.map(item =>({
                    codigoBairro: item.codigoBairro,
                    codigoMunicipio: item.municipio.codigoMunicipio,
                    nome: item.nome,
                    status: item.status

                }));
                return resultado;
    }

    public async deletarBairro(codigoBairro: number){
        const repositorio = bairroRepositorio;
        repositorio.delete(codigoBairro);
        return await this.listarBairros();
    }
}