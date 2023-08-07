import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { ErrosDaAplicacao } from "../../../../errosAplicacao/ErrosDaAplicacao";
import { Servicos } from "../Servicos";
import { FindOptionsWhere } from "typeorm";
import { Bairro } from "../../../../entidades/Bairro";

interface IBairro{
    codigoBairro: number,
    codigoMunicipio: number,
    nome: string,
    status: number
}

export class AtualizarBairro extends Servicos{

    constructor(repositorio: IRepositorios) {
       super(repositorio);
    }

    protected async validaTodosOsCampus({ codigoBairro, codigoMunicipio, nome, status }: IBairro) {

        if (!codigoBairro || isNaN(codigoBairro)) {
            throw new ErrosDaAplicacao(`Campo codigoBairro inválido: ${codigoBairro}`, 400);
        }
    
        if (!codigoMunicipio || isNaN(codigoMunicipio)) {
            throw new ErrosDaAplicacao(`Campo codigoMunicipio inválido: ${codigoMunicipio}`, 400);
        }
    
        if (!nome) {
            throw new ErrosDaAplicacao('Campo nome não encontrado', 400);
        }
    
        if (!status || isNaN(status) || !this.verificaStatusValido(status)) {
            throw new ErrosDaAplicacao(`Status do campo inválido: Motivo = ${status}`, 400);
        }
    
        const repositorioBairro = this.getRepositorio();
        const repositorioMunicipio = this.getRepositorioMunicipio();
    
        const bairro = await repositorioBairro.findOne({ where: { codigoBairro: codigoBairro } });
    
        if (!bairro) {
            throw new ErrosDaAplicacao('Bairro não cadastrado', 400);
        }
    
        const municipioExiste = await repositorioMunicipio.findOne({ where: { codigoMunicipio: codigoMunicipio } });
    
        if (!municipioExiste) {
            throw new ErrosDaAplicacao('codigoMunicipio não encontrado no Banco de Dados', 400);
        }
    
        const bairroExiste = await repositorioBairro.findOne({
            where: { nome: nome, codigoMunicipio: codigoMunicipio } as FindOptionsWhere<Bairro>
        });
    
        if (bairroExiste && bairroExiste.codigoBairro !== codigoMunicipio) {
            throw new ErrosDaAplicacao('Bairro já cadastrado nesse Municipio', 400);
        }
    
        bairro.codigoMunicipio = municipioExiste;
        bairro.nome = nome;
        bairro.status = status;
    
        try {
            await repositorioBairro.save(bairro);
        }
        catch (error) {
            throw new ErrosDaAplicacao('Erro ao salvar as alterações no banco de dados', 500);
        }
    }
    
    public async atualizarBairro({codigoBairro, codigoMunicipio, nome, status}: IBairro, requisicao: Request, resposta: Response){
        try{
            await this.validaTodosOsCampus({codigoBairro, codigoMunicipio, nome, status})
            const bairroRepositorio = this.getRepositorio();
            
            const bairros = await bairroRepositorio.find({
                select: ["codigoBairro", "nome", "status", "codigoMunicipio"],
                relations: ["codigoMunicipio"]
            });

            const todosBairros = this.listarBairros(bairros);

            return resposta.status(200).json(todosBairros);
        }
        catch(error){
            if(error instanceof ErrosDaAplicacao){
                return resposta.status(error.status).json({ mensagem: error.message, status: error.status });
            }
            else {
                return resposta.status(500).json({ mensagem: 'Erro interno no Servidor', status: 500, error});
            }
            
        }
    }
}