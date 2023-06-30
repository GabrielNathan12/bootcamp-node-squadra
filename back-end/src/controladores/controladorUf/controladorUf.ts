import { Request, Response } from "express-serve-static-core";
import { ControladorGeral } from "../ControladorGeral";
import { IRepositorios } from "../../Irepositorios/Irepositorios";


export class ControladorUf extends ControladorGeral{
    
    private repositorio: IRepositorios;
    // Utiliza uma interface que posso acessar os repositorios, sem ter um acoplamento do codigo direto
    constructor(repositorios: IRepositorios) {
        super();
        this.repositorio = repositorios;
    }

    public async atualizarDado(requisicao: Request, resposta: Response ) {
        try{
            const {codigoUF ,sigla, nome, status } = requisicao.body; 
            // Pega o codigoUF, sigla, nome e status do body do Json
            const pegarIdUf = Number(codigoUF);
            // Transformo o codigoUF em int, que ele vem como string
            const codigo_UF = await this.repositorio.ufRepositorio.findOne({where: {codigoUF : pegarIdUf}});
            

            // Verifico se existe o codigoUF passado, se nao existir retorna um status 400 dizendo que nao conseguiu encontrar
            if(!codigo_UF){
                return resposta.status(400).json({mensagem : 'Codigo Uf não encontrado', status:'400'});
            }
           
            // Verifica se a sigla e valido
            if(!this.vericarQtdSiglas(sigla)){
                return resposta.status(400).json({mensagem: 'Sigla inválida', status:'400'});
            }
            // Verifica se o status e valido
            if(!this.vericarStatus(Number(status))){
                return resposta.status(400).json({mensagem: 'Status inválido', status:'400'})
            }
            // Se passar pelos ifs, pode ser atualizado a sigla ou o nome ou o status
            codigo_UF.sigla =  sigla   || codigo_UF.sigla;
            codigo_UF.nome  =  nome    || codigo_UF.nome;
            codigo_UF.status=  status  || codigo_UF.status;
            
            const sigla_UF = await this.repositorio.ufRepositorio.findOne({where: {sigla: sigla}});
            const nome_UF = await this.repositorio.ufRepositorio.findOne({where : {nome: nome}});
             // Verifico se existe a sigla e o nome, se existir retorna um status 400 para nao colocar dados duplicados
             if(sigla_UF || nome_UF){
                return resposta.status(400).json({mensagem: 'Nome ou Sigla já inseridos',status:'400'});
            }
            
            // e salva de novo essa atualizacao no banco de dados
            await this.repositorio.ufRepositorio.save(codigo_UF);
            // Retorna novamente a lista completa, atualizada
            return resposta.status(200).json(await this.repositorio.ufRepositorio.find({}));
            
        }catch(erro){
            // se caso acorra um erro retorna uma mensagem de erro mais o erro encontrado
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro });
        }
    }
    // Funcao que remove o UF pelo id passado pela url
    public async removerDado(requisicao: Request, resposta: Response ) {
        try{
            const deletarPeloId = parseInt(requisicao.params.codigoUF);
            // Pego esse ID e converto para inteiro
            const codigo_Uf = await this.repositorio.ufRepositorio.findOne({where: {codigoUF : deletarPeloId}});

            // Se caso o codigo nao exista retorna, retorna o status 400, avisando que o codigo nao existe
            if(!codigo_Uf){
                return resposta.status(400).json({mensagem: 'Codigo Uf não encontrado !' , status: '400'});
            }
            // Se encontrar remove pelo ID
            await this.repositorio.ufRepositorio.remove(codigo_Uf);
            // Retorna uma mensagem dizendo que a o delecao foi completada com sucesso e os dados do Banco de dados
            return resposta.status(200).json({mensagem: 'Deleção completada', status: await this.repositorio.ufRepositorio.find({})});

        }
        catch(erro){
            // Se caso ocorra um erro, retorna um status 500 e uma mensagem de erro do servidor + o erro
            return resposta.status(500).json({mensagem: 'Erro no servidor: ' + erro});
        }
    }

    // Funcao que faz a insercao de dados na tabela UF
    public async adionarDado(requisicao: Request, resposta: Response) {
        try{
            const {sigla, nome, status} = requisicao.body;
            // Pega do body a sigla o nome e o status
            // Verifica se eles sao validos
            if(!sigla || !nome || !status){
                return resposta.status(400).json({mensagem: "Sigla ou Nome ou Status não encontrados no Json !"});
            }
            else {
                // Busca o nome no repositorio
                const verificarUmNome = await this.repositorio.ufRepositorio.findOne({where : {nome: nome} });
                // Busca sigla no repositorio
                const vericarUmaSigla = await this.repositorio.ufRepositorio.findOne({where: {sigla: sigla}});
                // Verifica se ela ja esta registrada, para nao inserir duplicado
                if(verificarUmNome){
                    return resposta.status(400).json({mensagem: 'Nome já inserido', status:'400'});
                }
                // Verifica se ja esta registrada a sigla, para nao inserir duplicado
                if (vericarUmaSigla){
                    return resposta.status(400).json({mensagem: 'Sigla já inserida', status:'400'});
                }
                // Verifica se a sigla e valida, ou seja possua 2 caracteres
                if(!this.vericarQtdSiglas(sigla)){
                    return resposta.status(400).json({mensagem: 'Sigla inválida', status:'400'});
                }
                // Verifica se o status e valido
                if(!this.vericarStatus(Number(status))){
                    return resposta.status(400).json({mensagem: 'Status inválido', status:'400'})
                }
                // Se conseguir passar por todos os ifs, entao e criado um novo UF
                const novoUf = this.repositorio.ufRepositorio.create(
                    {
                        sigla: sigla,
                        nome: nome,
                        status: status
                    }
                );
                // Salva no repositorio para enviar para o Bando de Dados
                await this.repositorio.ufRepositorio.save(novoUf);
                // Retorna os dados completos do Bando de dados 
                return resposta.status(200).json(await this.repositorio.ufRepositorio.find({}));
            }
        }
        catch(erro){
            // se caso aconteca algum erro, e avisado 
            return resposta.status(500).json({mensagem: "Erro interno no servidor: " + erro});
        }
    }

    // Funcao que retorna o repositorio completo
    public async listarDado(requisicao: Request, resposta: Response ) {
        try{
            const ufs = await this.repositorio.ufRepositorio.find({
                relations: {
                    municipios: false
                }
            });
            return resposta.status(200).json(ufs);
        }
        catch(erro){
            return resposta.status(500).json({mensagem: 'Erro no servidor ' + erro});
        }
    }
    public async listarDadosPeloNome(requisicao: Request, resposta: Response) {
        
        try {
         
            const nome = requisicao.query;
        
            console.log(nome);
            if (!nome) {
                return resposta.status(400).json({ mensagem: 'Nome não encontrado' });
            }
      
            const ufEncontrada = await this.repositorio.ufRepositorio.findOne({
                where: { nome: String(nome) }
          });
      
          if (!ufEncontrada) {
            return resposta.status(404).json({ mensagem: 'UF não encontrada' });
          }
      
          return resposta.status(200).json(ufEncontrada);
      
        } catch (erro) {
          return resposta.status(500).json({ mensagem: 'Erro interno no servidor: ' + erro });
        }
      }
      
      
    public async listarDadoPeloStatus(requisicao: Request, resposta: Response){
        try{
            const status = parseInt(requisicao.params.status);

            console.log(status);
            const uf = await this.repositorio.ufRepositorio.find({where: {status: status}});
            return resposta.status(200).json(uf);

        }catch(erro){
            return resposta.status(500).json('Erro interno no servidor' + erro);
        }
    }
    //Verifica se a quantidade de siglas e valida
    private vericarQtdSiglas(Sigla: string): Boolean {
        if(Sigla.length == 2){
            return true;
        }

        return false;
    }
}