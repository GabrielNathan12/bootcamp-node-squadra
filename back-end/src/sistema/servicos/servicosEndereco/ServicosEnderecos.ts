import { bairroRepositorio } from "../../../banco_de_dados/repositorios/bairroRepositorio";
import { enderecoRepositorio } from "../../../banco_de_dados/repositorios/enderecosRepositorio";
import { RequisicaoMalFeita } from "../../../configuracoes/helpers/ErrosApi";
import { IEndereco } from "../../vo/IEndereco";

export class ServicosEnderecos{
    
    public async procurarBairroPeloCodigoBairro(codigoBairro: number){
        const repositorio = bairroRepositorio;
        const bairro = await repositorio.findOne({where: {codigoBairro: codigoBairro}});

        return bairro;
    }

    public async criarEnderecos(endereco: IEndereco, codigoPessoa: number){
        const repositorio = enderecoRepositorio;

        const novosEnderecos = repositorio.create({bairro: {codigoBairro: endereco.codigoBairro},
                                                pessoa: {codigoPessoa: codigoPessoa,
                                                    }, nomeRua: endereco.nomeRua, numero: endereco.numero,
                                                    complemento: endereco.complemento, cep: endereco.cep});
        
        await repositorio.save(novosEnderecos);
    }
}