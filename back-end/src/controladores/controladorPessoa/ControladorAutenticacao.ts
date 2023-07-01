import { Request, Response } from "express";
import { AutenticacaoPessoa } from "./servicos/AutenticacaoPessoa";
import { IRepositorios } from "../../Irepositorios/Irepositorios";

export class ControladorAutenticacao {
  private repositorios: IRepositorios;

  constructor(repositorios: IRepositorios) {
    this.repositorios = repositorios;
  }

  public async criarSecao(requisicao: Request, resposta: Response) {
    const { login, senha } = requisicao.body;
    const autenticacaoPessoa = new AutenticacaoPessoa(this.repositorios);

    try {
      const loginPessoa = await autenticacaoPessoa.criarAutenticacao({ login, senha }, requisicao, resposta);

      return resposta.status(200).json(loginPessoa);
      
    } catch (error) {
      return resposta.status(500).json({ mensagem: 'Erro interno no servidor', status: '500' });
    }
  }
}
