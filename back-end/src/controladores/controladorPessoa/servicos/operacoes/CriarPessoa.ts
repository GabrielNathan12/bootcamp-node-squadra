import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { hash } from "bcryptjs";
import { ErrosDaAplicacao } from "../../../../errosAplicacao/ErrosDaAplicacao";
import { Servicos } from "../Servicos";
import { Endereco } from "../../../../entidades/Endereco";

interface IPessoa {
    nome: string;
    sobrenome: string;
    idade: number;
    login: string;
    senha: string;
    status: number;
    enderecos?: IEndereco[];
}

interface IEndereco {
    codigoBairro: { codigoBairro: number };
    nomeRua: string;
    numero: number;
    complemento: string;
    cep: string;
    status: number;
    codigoPessoa?: { codigoPessoa: number };
}

export class CriarPessoa extends Servicos{

    constructor(repositorio: IRepositorios) {
        super(repositorio);
    }

    public async criarPessoa(dadosPessoa: IPessoa,requisicao: Request, resposta: Response) {
        try {
            const { nome, sobrenome, idade, login, senha, status, enderecos } = dadosPessoa;
            
            await this.validaTodosOsCampos({ nome, sobrenome, idade, login, senha, status });
            
            const repositorioPessoa = this.obterRepositorioPessoa();
            const repositorioEndereco = this.obterRepositorioEndereco();

            const criptografar = await hash(senha, 8);

            const novaPessoa = repositorioPessoa.create({
                nome: nome,
                sobrenome: sobrenome,
                idade: idade,
                login: login,
                senha: criptografar,
                status: status,
                enderecos: []
            });

            if (enderecos) {
                const repositorioBairro = this.obterRepositorioBairro();

                for (const endereco of enderecos) {
                    
                    const {codigoBairro,nomeRua,numero,complemento,cep,status} = endereco;
                    await this.validarCamposEndereco({codigoBairro,nomeRua,numero,complemento,cep,status});
                    
                    const bairroExiste = await repositorioBairro.findOne({ where: { codigoBairro: endereco.codigoBairro.codigoBairro } });

                    if (!bairroExiste) {
                        throw new ErrosDaAplicacao("Bairro não cadastrado", 400);
                    }

                    const novoEndereco: Endereco = repositorioEndereco.create({
                        codigoBairro: bairroExiste,
                        nomeRua: endereco.nomeRua,
                        numero: endereco.numero,
                        complemento: endereco.complemento,
                        cep: endereco.cep,
                        codigoPessoa: novaPessoa
                    });

                    novaPessoa.enderecos.push(novoEndereco);
                    await repositorioEndereco.insert(novoEndereco);
                }
            }

            await repositorioPessoa.save(novaPessoa);

            const pessoasComEnderecos = await repositorioPessoa.find({
                select: ["codigoPessoa", "nome", "sobrenome", "idade", "login", "senha", "status"],
                relations: ["enderecos"],
            });

            return resposta.status(200).json(pessoasComEnderecos);
        } 
        catch (error) {
            if(error instanceof ErrosDaAplicacao){
                return resposta.status(error.status).json({ mensagem: error.message, status: error.status });
            }
            else{
                return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error});
            }
        }
    }

}
