import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import autenticado from '../configuracoes/autores';

interface IToken{
    iad: number,
    exp: number,
    sub: string
}

export function eAutenticado(requisicao: Request, resposta: Response, proximo: NextFunction){
    const pessoaAutenticado = requisicao.headers.authorization;
    
    if(!pessoaAutenticado){
        return resposta.status(400).json({mensagem: 'JWT nao existe token', status:'400'});
    }

    const [, token] = pessoaAutenticado.split(' ');

    try{
        const codigoToken = verify(token,autenticado.jwt.segreedo);
        
        const {sub} = codigoToken as IToken;
        
        requisicao.pessoa = {
            codigoPessoa: sub
        }

        return proximo();
    }catch(error){
        return resposta.status(400).json({mensagem: 'Token recebido invalido', status: '400'});
    }
}