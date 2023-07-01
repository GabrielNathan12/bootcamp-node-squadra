import { Request, Response } from "express";
import { IRepositorios } from "../../../Irepositorios/Irepositorios";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Pessoa } from "../../../entidades/Pessoa";
import autores from '../../../configuracoes/autores';

interface IAutenticar {
  login: string;
  senha: string;
}

interface IAutenticado {
  pessoa: Pessoa;
  token: string;
}

export class AutenticacaoPessoa {
  private repositorios: IRepositorios;

  constructor(repositorios: IRepositorios) {
    this.repositorios = repositorios;
  }

  public async criarAutenticacao({ login, senha }: IAutenticar, requisicao: Request, resposta: Response): Promise<IAutenticado> {
    const pessoaRepositorio = this.repositorios.pessoaRepositorio;
    const pessoa = await pessoaRepositorio.findOne({ where: { login } });
    
    if (!pessoa) {
      resposta.status(400).json({ mensagem: "Email inválido", status: "400" });
      throw new Error("Email inválido");
    }

    const senhaConfirmada = await compare(senha, pessoa.senha);

    if (!senhaConfirmada) {
      resposta.status(400).json({ mensagem: "Senha inválida", status: "400" });
      throw new Error("Senha inválida");
    }

    const token = sign({ pessoaId: pessoa.codigoPessoa }, autores.jwt.segreedo, { expiresIn: autores.jwt.expirado,
    });

    return { pessoa, token };
  }
}
