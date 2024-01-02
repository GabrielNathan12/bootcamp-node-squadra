import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import autenticado from '../autores';

interface IToken{
    iad: number,
    exp: number,
    sub: string
}

export function eAutenticado(requisicao: Request, resposta: Response, proximo: NextFunction){
    const pessoaAutenticado = requisicao.headers.authorization;
    
    if(!pessoaAutenticado){
        return resposta.status(400).json({mensagem: 'Login nao informado', status:400});
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
        return resposta.status(400).json({mensagem: 'Login nao informado', status: 400});
    }
}