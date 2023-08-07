import { Request, Response } from "express";
import { IRepositorios } from "../../../../Irepositorios/Irepositorios";
import { ErrosDaAplicacao } from "../../../../errosAplicacao/ErrosDaAplicacao";
import { Servicos } from "../Servicos";
import { Municipio } from "../../../../entidades/Municipio";
import { FindOptionsWhere } from "typeorm";

interface IMunicipio{
    codigoMunicipio: number,
    codigoUF: number,
    nome: string, 
    status: number
}

export class AtualizarMunicipio extends Servicos{
   
    constructor(repositorios:IRepositorios){
        super(repositorios);
    }

    protected async validaTodosOsCampus({ codigoMunicipio, codigoUF, nome, status }: IMunicipio) {

        if (!codigoMunicipio || isNaN(codigoMunicipio)) {
            throw new ErrosDaAplicacao(`Campo codigoMunicipio inválido: ${codigoMunicipio}`, 400);
        }
    
        if (!codigoUF || isNaN(codigoUF)) {
            throw new ErrosDaAplicacao(`Campo codigoUF inválido: ${codigoUF}`, 400);
        }
    
        if (!nome) {
            throw new ErrosDaAplicacao('Campo nome não encontrado', 400);
        }
    
        if (!status || isNaN(status) || !this.verificaStatusValido(status)) {
            throw new ErrosDaAplicacao(`Status do campo inválido: Motivo = ${status}`, 400);
        }
    
        const repositorioMunicipio = this.getRepositorio();
        const repositorioUF = this.getRepositorioUf();
    
        const municipio = await repositorioMunicipio.findOne({ where: { codigoMunicipio: codigoMunicipio } });
    
        if (!municipio) {
            throw new ErrosDaAplicacao('Município não cadastrado', 400);
        }
    
        const ufExiste = await repositorioUF.findOne({ where: { codigoUF: codigoUF } });
    
        if (!ufExiste) {
            throw new ErrosDaAplicacao('Código UF não encontrado no Banco de Dados', 400);
        }
    
        const municipioExiste = await repositorioMunicipio.findOne({
            where: { nome: nome, codigoUF: codigoUF } as FindOptionsWhere<Municipio>
        });
    
        if (municipioExiste && municipioExiste.codigoMunicipio !== codigoMunicipio) {
            throw new ErrosDaAplicacao('Município já cadastrado nesse UF', 400);
        }
    
        municipio.codigoUF = ufExiste;
        municipio.nome = nome;
        municipio.status = status;
    
        try {
            await repositorioMunicipio.save(municipio);
        }
        catch (error) {
            throw new ErrosDaAplicacao('Erro ao salvar as alterações no banco de dados', 500);
        }
    }
    

    public async atualizarMunicipio({codigoMunicipio, codigoUF, nome, status}: IMunicipio, requisicao: Request, resposta: Response){

        try{
            await this.validaTodosOsCampus({codigoMunicipio, codigoUF, nome, status})
            const repositorioMunicipio = this.getRepositorio();
            
            const municipios = await repositorioMunicipio.find({
                select: ["codigoMunicipio", "nome", "status", "codigoUF"],
                relations: ["codigoUF"]
            });

            const todosMunicipios = this.listarMunicipios(municipios);

            return resposta.status(200).json(todosMunicipios);
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